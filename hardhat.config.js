require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox")

const { API_URL, PRIVATE_KEY, ARBISCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    },
    hardhat: {
      allowUnlimitedContractSize: false,
      allowBlocksWithSameTimestamp: true,
    },
  },  
  etherscan: {
    apiKey: {
      arbitrumSepolia: ARBISCAN_API_KEY,
    }
  }
}