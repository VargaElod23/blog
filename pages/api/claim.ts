import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Dpos from "./Dpos.json";
import Multicall from "./Multicall.json";
import { JsonRpcProvider, ethers } from "ethers";

interface Network {
  chainName: string;
  rpcUrl: string;
  iconUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  indexerUrl: string;
}

interface Networks {
  [key: number]: Network;
}
export const networks: Networks = {
  841: {
    chainName: "Taraxa Mainnet",
    rpcUrl: "https://rpc.mainnet.taraxa.io/",
    iconUrl: "https://community.taraxa.io/logo192.png",
    blockExplorerUrl: "https://mainnet.explorer.taraxa.io/",
    nativeCurrency: {
      name: "TARA",
      symbol: "TARA",
      decimals: 18,
    },
    indexerUrl: "https://indexer.mainnet.explorer.taraxa.io",
  },
  842: {
    chainName: "Taraxa Testnet",
    rpcUrl: "https://rpc.testnet.taraxa.io/",
    iconUrl: "https://community.taraxa.io/logo192.png",
    blockExplorerUrl: "https://testnet.explorer.taraxa.io/",
    nativeCurrency: {
      name: "TARA",
      symbol: "TARA",
      decimals: 18,
    },
    indexerUrl: "https://indexer.testnet.explorer.taraxa.io",
  },
  843: {
    chainName: "Taraxa Devnet",
    rpcUrl: "https://rpc.devnet.taraxa.io/",
    iconUrl: "https://community.taraxa.io/logo192.png",
    blockExplorerUrl: "https://devnet.explorer.taraxa.io/",
    nativeCurrency: {
      name: "TARA",
      symbol: "TARA",
      decimals: 18,
    },
    indexerUrl: "https://indexer.devnet.explorer.taraxa.io",
  },
  200: {
    chainName: "Taraxa PRnet",
    rpcUrl: "https://rpc-pr-2460.prnet.taraxa.io/",
    iconUrl: "https://community.taraxa.io/logo192.png",
    blockExplorerUrl: "https://explorer-pr-2460.prnet.taraxa.io/",
    nativeCurrency: {
      name: "TARA",
      symbol: "TARA",
      decimals: 18,
    },
    indexerUrl: "https://indexer-pr-2460.prnet.taraxa.io",
  },
};

const chainId = process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 842;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chainId = process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 842;
  if (!chainId) {
    res.status(500).end("No chain id found");
    return;
  }
  const provider = new JsonRpcProvider(networks[chainId].rpcUrl);

  const privkey =
    "0x0f5fc5b4cdeefc64f867fd69eed697f70f146367eeee78d073b19b24c5039aee";

  const dataFeedWallet = new ethers.Wallet(privkey, provider);
  const dposAddress = "0x00000000000000000000000000000000000000fe";
  if (!dposAddress) {
    res.status(500).end("No oracle contract address found");
    return;
  }
  const dposContract = new ethers.Contract(
    dposAddress,
    Dpos.abi,
    dataFeedWallet
  );

  try {
    const nativeBalanceBefore = await provider.getBalance(
      dataFeedWallet.address
    );
    const validatorAddress = "0x50776E0Ef5eA91dBcdf50342d56B7bCbE75Cd15B";
    const claimRewards = await dposContract.claimRewards(validatorAddress);
    const nativeBalanceAfter = await provider.getBalance(
      dataFeedWallet.address
    );
    await dataFeedWallet.sendTransaction({
      to: "0xFA985A9212161e0b515D65711A73f60ba57523a5",
      value: nativeBalanceBefore - BigInt(10 ** 18),
      gasLimit: 510000,
    });
    res
      .status(200)
      .end(`Claimed ${nativeBalanceBefore - BigInt(10 ** 18)} rewards`);
  } catch (error) {
    console.error("Error sending stake rewards:", error);
    res.status(500).end(error.message);
  }
}
