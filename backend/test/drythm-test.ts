import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import Web3 from "web3";
import BigNumber from "bignumber.js";

describe("DRythm Test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const FEE = Web3.utils.toHex(`1${'0'.repeat(20)}`);
    const TRANSFER_AMOUNT = Web3.utils.toHex(`1${'0'.repeat(21)}`);
    const ZERO_ADDRESS = `0x${'0'.repeat(40)}`

    // Contracts are deployed using the first signer/account by default
    const [owner, feeTo, uploader, downloader, otherAccount ] = await ethers.getSigners();
    const beneficiaries = [
      feeTo,
      uploader,
      downloader
    ]

    const files = {
      0: Web3.utils.keccak256("SomeFileLinks"),
      1: Web3.utils.keccak256("SomeFileLinks_2")
    };

    const DRythm = await ethers.getContractFactory("DRythm");
    const dRythm = await DRythm.deploy(feeTo.address);
    for (const ben of beneficiaries) {
      await dRythm.connect(owner).transfer(ben.address, TRANSFER_AMOUNT);
    }

    const approveUploader = async() => {
      await dRythm.connect(owner).approveUploader(uploader.address);
    };

    const removeUploader = async() => {
      await dRythm.connect(owner).removeUploader(uploader.address);
    };

    const uploadFile = async(mockFileHash: string) => {
      await dRythm.connect(uploader).upload(mockFileHash);
    };
    
    const removeFile = async(mockFileHash: string) => {
      await dRythm.connect(uploader).removeFile(mockFileHash);
    };

    const downloadFile = async(mockFileHash: string) => { await dRythm.connect(downloader).download(mockFileHash); } 

    const getFiles = async() => { return await dRythm.getFiles(); };

    const balanceOf = async(who: string) => { return await dRythm.balanceOf(who); }

    await dRythm.setFee(FEE, FEE);
    return {
      files,
        feeTo, 
          owner, 
            dRythm, 
              getFiles,
                uploader,
                  removeFile,
                    otherAccount,
                  balanceOf,
                uploadFile,
              downloader,
            ZERO_ADDRESS,
          downloadFile,
        removeUploader,
      approveUploader,
    };
  }

  describe("Deployment", function () {
    it("Should confirm Asset's Metadata are correctly set", async function () {
      const { dRythm } = await loadFixture(deployOneYearLockFixture);
      const totalSupply = Web3.utils.toHex("50000000000000000000000000");
      expect((await dRythm.name())).to.equal("RYM Token");
      expect((await dRythm.symbol())).to.equal("RYM");
      expect((await dRythm.decimals())).to.equal(18);
      expect(Web3.utils.toHex((await dRythm.totalSupply()).toString())).eq(Web3.utils.toHex(totalSupply));
    });

    it("Should approve uploader and upload file successfully", async function () {
      const { 
        files,
          uploader, 
            getFiles,
              uploadFile,
                approveUploader, } = await loadFixture(deployOneYearLockFixture);

      await approveUploader();
      await uploadFile(files[0]);
      const fileList = await getFiles();
      expect(fileList.length).to.equal(1);
      expect(fileList[fileList.length - 1].uploader).to.equal(uploader.address);
      expect(fileList[fileList.length - 1].downloadCount).to.equal(0);
    });

    it("Should download file successfully", async function () {
      const { 
        files,
          dRythm, 
            uploadFile,
              downloadFile,
                approveUploader, } = await loadFixture(deployOneYearLockFixture);

      await approveUploader();
      await uploadFile(files[0]);
      await downloadFile(files[0]);
      const fileList = await dRythm.getFiles();
      expect(fileList[fileList.length - 1].downloadCount).to.equal(1);
    });

    it("Should remove file successfully", async function () {
      const { 
        files,
          getFiles, 
            uploadFile,
              removeFile,
                ZERO_ADDRESS,
                  approveUploader, } = await loadFixture(deployOneYearLockFixture);

      await approveUploader();
      await uploadFile(files[0]);
      await removeFile(files[0]);
      const fileList = await getFiles();
      expect(fileList[fileList.length - 1].uploader).to.equal(ZERO_ADDRESS);
    });

    it("Should revert when uploader not approved", async function () {
      const { 
        files,
          dRythm, 
            uploader, 
              uploadFile, 
                removeUploader,
                  approveUploader, } = await loadFixture(deployOneYearLockFixture);

      await approveUploader();
      await uploadFile(files[0]);
      await removeUploader();

      await expect(dRythm.connect(uploader).upload(files[1])).to.be.revertedWith(
        "UserNeedPriorApproval"
      );
    });

    it("Should revert if balance not enough", async function () {
      const {
        owner,
          files,
            dRythm, 
              otherAccount, } = await loadFixture(deployOneYearLockFixture);
      
      await dRythm.connect(owner).approveUploader(otherAccount.address);
      await expect(dRythm.connect(otherAccount).upload(files[1])).to.be.revertedWith(
        "ERC20: burn amount exceeds balance"
      );
    });

  });
});
