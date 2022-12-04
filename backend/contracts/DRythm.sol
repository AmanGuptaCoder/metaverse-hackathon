// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./AbstractDRythm.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * @dev Extension of {ERC20} that allows token holders to destroy both their own
 * tokens and those that they have an allowance for, in a way that can be
 * recognized off-chain (via event analysis).
 */
contract DRythm is Context, AbstractDRythm, Ownable {

  UploadData private pData;

  address feeTo;

  // Check for conditions that must evaluate to true before proceeding to executions
  modifier conditionsMustbeTrue(bool isFileUploaded, string memory errorMessage) {
    require(_getProfile(_msgSender()).isUploader, "UserNeedPriorApproval");
    if(!isFileUploaded) revert FileError(errorMessage);
    _;
  }

  constructor (address _feeTo) 
    AbstractDRythm(
      "RYM Token",
      "RYM",
      _msgSender(),
      50_000_000 * (10 ** 18)
    ) 
  { feeTo = _feeTo; }

  receive() external payable {
    Address.sendValue(payable(feeTo), msg.value);
  }


  /**@dev Adds new file with fileHash
   * @param fileHash : Hash of the file to add.
   * 
   */
  function upload(bytes32 fileHash) 
    external
    conditionsMustbeTrue(
      pData.fileIndexes[fileHash].isUploaded == false,
      "File exist"
    ) 
    modifyContext 
    returns(bool) 
  {
    _takeFee(_msgSender(), feeTo, pData.uploadFee, true);
    uint fileIndex = pData.files.length;
    pData.files.push(Data(block.timestamp, 0, _msgSender()));
    pData.fileIndexes[fileHash] = FileStatus(true, fileIndex);

    emit FileAdded(fileHash, _msgSender());
    return true;
  }

  /**@dev Removes file with fileHash
   * @param fileHash : Hash of the file to remove.
   * 
   */
  function removeFile(bytes32 fileHash) 
    external
    returns (bool _return) 
  {
    if(!pData.fileIndexes[fileHash].isUploaded) revert FileError("File not exist");
    _takeFee(_msgSender(), feeTo, pData.removalFee, true);
    _return = pData.fileIndexes[fileHash].isUploaded;
    delete pData.files[_findIndex(fileHash)];
    delete pData.fileIndexes[fileHash];

    emit FileRemoved(fileHash, _msgSender());
    return true;
  }

  /**@notice Download file
   * @param fileHash : Hash of the file to download.
   */
  function download(bytes32 fileHash) 
    external 
    returns(bool)
  {
    uint fileIndex = _findIndex(fileHash);
    if(!pData.fileIndexes[fileHash].isUploaded) revert FileError("File not exist");
    _takeFee(_msgSender(), pData.files[fileIndex].uploader, pData.downloadFee, false);
    
    pData.files[fileIndex].downloadCount ++;
    return true;
  }

  function approveUploader(address who) public modifyContext onlyOwner {
    require(!_getProfile(who).isUploader, "AlreadyApproved");
    _updateProfile(true, who);
  }

  function removeUploader(address who) public modifyContext onlyOwner {
    require(_getProfile(who).isUploader, "AlreadyRemoved");
    _updateProfile(false, who);
  }

  ///@dev Searches and return file index for fileHash
  function _findIndex(bytes32 fileHash) internal view returns(uint _return) {
    _return = pData.fileIndexes[fileHash].index;
  }

  /**@dev Deducts fee from caller. 
   * For testing purpose, we will spread the sharing formula in 30/70
   * i.e 70% for the uploader and 30 for the platform. 
   * Note: 30% accrued to the platform is instantly burnt. This in turn increases the value 
   * of the platform asset. 
   * 
   */
  function _takeFee(address from, address to, uint fee, bool uploadContext) private {
    if(fee > 0) {
      uint burnable;
      if(!uploadContext) {
        unchecked {
          burnable = (fee * 30) / 100;
          _transfer(from, to, fee - burnable);
        }
      }
      _burn(from, fee);
    }
  }

  ///@dev Resets fees 
  function setFee(uint removalFee, uint uploadFee) public onlyOwner {
    pData.removalFee = removalFee;
    pData.uploadFee = uploadFee;
  }

  function getFiles() public view returns (Data[] memory _return) {
    _return = pData.files;
    return _return;
  }
}
