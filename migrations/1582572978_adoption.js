var adoption = artifacts.require('Adoption');
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(adoption);
};
