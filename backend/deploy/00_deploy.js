// module.exports = async ({
//   getNamedAccounts,
//   deployments,
//   getChainId,
//   getUnnamedAccounts,
// }) => {
//   const { deploy } = deployments;
//   const { deployer } = await getNamedAccounts();

//   // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
//   await deploy("Greeter", {
//     from: deployer,
//     // gas: 4000000,
//     args: ["Greeting set from ./deploy/Greeter.ts"],
//   });
// };

// deploy/00_deploy_my_contract.js

// import { ethers } from "hardhat";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer, feeTo } = await getNamedAccounts();

  await deploy("DRythm", {
    from: deployer,
    args: [ feeTo ],
    log: true,
  });
};

module.exports.tags = ["DRythm"];
