odule.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer, feeTo } = await getNamedAccounts();

  await deploy("DRythm", {
    from: deployer,
    args: [ feeTo ],
    log: true,
  });
};

module.exports.tags = ["DRythm"];
