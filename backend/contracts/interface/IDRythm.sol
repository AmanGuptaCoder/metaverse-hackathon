// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IDRythm {
  error FileError(string);
  error FileNotExist(bytes32);
  error OnlyInContextOfUpload();
  error FeeToIsZeroAddress(address);
  error UserNeedPriorApproval(address);
  error AlreadyRemoved(address);
  error AlreadyApproved(address);
  event FileAdded(bytes32, address);
  event FileRemoved(bytes32, address);

  struct UploadData {
    uint uploadFee;
    uint removalFee;
    uint downloadFee;
    Data[] files;
    mapping(bytes32 => FileStatus) fileIndexes;
  }

  struct FileStatus {
    bool isUploaded;
    uint index;
  }

  struct  Data {
    uint dateUploaded;
    uint downloadCount;
    address uploader;
  }

  struct Profile {
    bool isUploader;
    uint256 balance;
  }


  function upload(bytes32 fileHash) external returns(bool);
  function download(bytes32 fileHash) external returns(bool);
  function removeFile(bytes32 fileHash) external returns (bool);
}