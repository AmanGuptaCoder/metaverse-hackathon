import { config as CONFIG } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

CONFIG();

const config: HardhatUserConfig = {
  networks: {
    // for mainnet
    'optimism': {
      url: process.env.OPTIMISM_MAINNET_URL,
      accounts: { mnemonic: process.env.MNEMONIC }
    },
    // for testnet
    'optimism-goerli': {
      url: process.env.OPTIMISM_GOERLI_TESTNET_URL,
      accounts: { mnemonic: process.env.MNEMONIC }
    },
    // for the local dev environment
    'optimism-local': {
      url: "http://localhost:8545",
      accounts: { mnemonic: process.env.MNEMONIC }
    },
  },

  solidity: {
    version: "0.8.17",
    settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "byzantium"
      }
    },
};

export default config;
