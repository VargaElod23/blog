import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    mainnet: {
      chainId: 841,
      url: process.env.TARA_MAINNET_URL || "",
      accounts:
        process.env.MAINNET_PRIV_KEY !== undefined
          ? [process.env.MAINNET_PRIV_KEY]
          : [],
      gas: 10000000,
      gasPrice: 10000000,
      allowUnlimitedContractSize: true,
    },
    testnet: {
      chainId: 842,
      url: process.env.TARA_TESTNET_URL || "",
      accounts:
        process.env.MAINNET_PRIV_KEY !== undefined
          ? [process.env.MAINNET_PRIV_KEY]
          : [],
      gas: 10000000,
      gasPrice: 10000000,
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
