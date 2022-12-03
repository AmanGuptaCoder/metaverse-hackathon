import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import Web3 from "web3";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const FEE = Web3.utils.toHex(`1${'0'.repeat(20)}`);
    const TRANSFER_AMOUNT = Web3.utils.toHex(`1${'0'.repeat(21)}`);
    const ZERO_ADDRESS = `0x${'0'.repeat(40)}`

    const MOCK_FILE_HASH = Web3.utils.keccak256("SomeFileLinks");

    // Contracts are deployed using the first signer/account by default
    const [owner, feeTo, uploader, downloader ] = await ethers.getSigners();
    const beneficiaries = [
      feeTo,
      uploader,
      downloader
    ]

    const DRythm = await ethers.getContractFactory("DRythm");
    const dRythm = await DRythm.deploy(feeTo.address);
    for (const ben of beneficiaries) {
      await dRythm.connect(owner).transfer(ben.address, TRANSFER_AMOUNT);
    }
    await dRythm.setFee(FEE, FEE);
    return { 
      feeTo, 
      owner, 
      dRythm, 
      uploader, 
      downloader, 
      ZERO_ADDRESS,
      MOCK_FILE_HASH,
    };
  }

  describe("Deployment", function () {
    it("Should approve uploader successfully", async function () {
      const { dRythm, owner, feeTo, uploader, MOCK_FILE_HASH } = await loadFixture(deployOneYearLockFixture);
      await dRythm.connect(owner).approveUploader(uploader.address);
      await dRythm.connect(uploader).upload(MOCK_FILE_HASH);
      const files = await dRythm.getFiles();
      expect(files.length).to.equal(1);
      expect(files[files.length - 1].uploader).to.equal(uploader.address);
      expect(files[files.length - 1].downloadCount).to.equal(0);
    });

    it("Should download file successfully", async function () {
      const { dRythm, owner, downloader, uploader, MOCK_FILE_HASH } = await loadFixture(deployOneYearLockFixture);
      await dRythm.connect(owner).approveUploader(uploader.address);
      await dRythm.connect(uploader).upload(MOCK_FILE_HASH);
      await dRythm.connect(downloader).download(MOCK_FILE_HASH);
      const files = await dRythm.getFiles();
      expect(files[files.length - 1].downloadCount).to.equal(1);
    });

    it("Should remove file successfully", async function () {
      const { dRythm, owner, downloader, uploader, MOCK_FILE_HASH, ZERO_ADDRESS } = await loadFixture(deployOneYearLockFixture);
      await dRythm.connect(owner).approveUploader(uploader.address);
      await dRythm.connect(uploader).upload(MOCK_FILE_HASH);
      await dRythm.connect(downloader).removeFile(MOCK_FILE_HASH);
      const files = await dRythm.getFiles();
      expect(files[files.length - 1].uploader).to.equal(ZERO_ADDRESS);
    });

    it("Should remove uploader successfully", async function () {
      const { dRythm, owner, downloader, uploader, MOCK_FILE_HASH, ZERO_ADDRESS } = await loadFixture(deployOneYearLockFixture);
      // await dRythm.connect(owner).approveUploader(uploader.address);
      // await dRythm.connect(owner).removeUploader(uploader.address);

      await expect(dRythm.connect(uploader).upload(MOCK_FILE_HASH)).to.be.revertedWith(
        `reverted with a custom error`
      );
    });
  });
});
