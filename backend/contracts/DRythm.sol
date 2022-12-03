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
    if(!_getProfile(_msgSender()).isUploader) revert UserNeedPriorApproval(_msgSender());
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
  {
    if(_feeTo == address(0)) revert FeeToIsZeroAddress(_feeTo);
    feeTo = _feeTo;
  }

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
    _takeFee(_msgSender(), pData.uploadFee);
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
    _takeFee(_msgSender(), pData.removalFee);
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
    if(!pData.fileIndexes[fileHash].isUploaded) revert FileError("File not exist");
    _takeFee(_msgSender(), pData.downloadFee);
    
    pData.files[_findIndex(fileHash)].downloadCount ++;
    return true;
  }

  function approveUploader(address who) public modifyContext onlyOwner {
    if(_getProfile(_msgSender()).isUploader) revert AlreadyApproved(_msgSender());
     _updateProfile(true, who);
  }

  function removeUploader(address who) public modifyContext onlyOwner {
    if(!_getProfile(_msgSender()).isUploader) revert AlreadyRemoved(_msgSender());
     _updateProfile(false, who);
  }

  ///@dev Searches and return file index for fileHash
  function _findIndex(bytes32 fileHash) internal view returns(uint _return) {
    _return = pData.fileIndexes[fileHash].index;
  }

  // Deduct and burn fee
  function _takeFee(address who, uint fee) private {
    _burn(who, fee);
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
