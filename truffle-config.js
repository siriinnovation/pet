var HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: ()=> new HDWalletProvider(process.env.MNEMONIC,"https://rinkeby.infura.io/v3/b097b9a0c32d4445b4980134d5542814"),
      network_id: 4
    }
  }
};
