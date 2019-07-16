var OpenBank = artifacts.require("./OpenBank.sol");

module.exports = function(deployer) {
  deployer.deploy(OpenBank, { value: 30000000000000000000 });
};