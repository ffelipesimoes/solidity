var OpenBank = artifacts.require(".contracts/OpenBank.sol");

module.exports = function(deployer) {
  deployer.deploy(OpenBank, { value: 30000000000000000000 });
};