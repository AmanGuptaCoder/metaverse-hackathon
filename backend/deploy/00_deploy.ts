// deploy/00_deploy_my_contract.js
type DeploymentProps = {
  getNamedAccounts : Function;
  deployments : any;
}

module.exports = async (props: DeploymentProps) => {
  const {getNamedAccounts, deployments} = props;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  await deploy('MyContract', {
    from: deployer,
    args: ['Hello'],
    log: true,
  });
};
module.exports.tags = ['MyContract'];