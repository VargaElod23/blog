import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import ApyOracle from "./ApyOracle.json";
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

export type Call = {
  target: string;
  callData: string;
};

interface ValidatorData {
  address: string;
  pbftCount: number;
  rank: number;
}

interface ValidatorYield {
  apy: number;
  fromBlock: number;
  toBlock: number;
}

interface ValidatorDetails {
  account: string;
  pbftCount: number;
  rank: number;
  apy: number;
  fromBlock: number;
  toBlock: number;
}
const chainId = process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 842;

const getValidatorYield = async (
  validatorAddress: string
): Promise<ValidatorYield> => {
  const url = `${networks[chainId].indexerUrl}/address/${validatorAddress}/yield`;
  const validatorYield = await axios.get(url);
  if (validatorYield.status === 200) {
    const { data } = validatorYield;
    return {
      apy: parseInt((parseFloat(data.yield) * 10000).toString()),
      fromBlock: parseInt(data.fromBlock),
      toBlock: parseInt(data.toBlock),
    };
  }
};

const fetchValidatorStatsForWeek = async (): Promise<ValidatorData[]> => {
  let start = 0;
  let hasNextPage = true;
  const allValidators: ValidatorData[] = [];
  while (hasNextPage) {
    try {
      const validators = await axios.get(
        `${networks[chainId].indexerUrl}/validators?limit=100&start=${start}`
      );
      if (validators.status === 200) {
        const { data } = validators;
        const { hasNext, data: validatorData } = data;
        allValidators.push(...validatorData);
        hasNextPage = hasNext;
        start += 100;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      hasNextPage = false;
    }
  }
  return allValidators;
};

const fetchValidatorFinalData = async (
  dataFeedContract: ethers.Contract,
  multicallContract: ethers.Contract,
  oracleAddress: string,
  provider: ethers.JsonRpcProvider
): Promise<void> => {
  const validatorData = await fetchValidatorStatsForWeek();
  console.log("=============== FETCHING VALIDATORS DONE ===============");
  const updateCalls: Call[] = [];
  if (!validatorData.length) throw new Error("No validator data found");
  for (const validator of validatorData) {
    console.log(
      `=============== FETCHING STATS FOR ${validator.address} ===============`
    );
    const validatorYield = await getValidatorYield(validator.address);
    const validatorDetails: ValidatorDetails = {
      account: validator.address,
      pbftCount: validator.pbftCount,
      rank: validator.rank,
      ...validatorYield,
    };
    const values = [validatorDetails.account, validatorDetails];

    console.log(values);

    const updateCall = await dataFeedContract.updateNodeData(
      validatorDetails.account,
      validatorDetails
    );
    console.log(updateCall);
    const tx = await updateCall.wait();
    console.log(tx);

    console.log("=============== UPDATING VALIDATOR STATS ===============");
    // const updateCallData = dataFeedContract.interface.encodeFunctionData(
    //   "updateNodeData",
    //   values
    // );

    // updateCalls.push({ target: oracleAddress, callData: updateCallData });
  }
  //   console.log("=============== FETCHING VALIDATORS DONE ===============");
  //   console.log("=============== UPDATING VALIDATOR STATS ===============");
  //   const tx = await multicallContract.aggregate([updateCalls[0]]);
  //   console.log(tx);
  //   if (!tx) throw new Error("No tx found");
};

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

  const privkey = process.env.SIGNER_PRIV_KEY;
  if (!privkey) {
    res.status(500).end("No private key found");
    return;
  }
  const dataFeedWallet = new ethers.Wallet(privkey, provider);
  const oracleAddress = process.env.APY_ORACLE_TESTNET_ADDRESS;
  if (!oracleAddress) {
    res.status(500).end("No oracle contract address found");
    return;
  }
  const dataFeedContract = new ethers.Contract(
    oracleAddress,
    ApyOracle.abi,
    dataFeedWallet
  );

  const multicallAddress = process.env.MULTICALL_MAINNET_ADDRESS;
  if (!multicallAddress) {
    res.status(500).end("No multicall contract address found");
    return;
  }

  const multicallContract = new ethers.Contract(
    multicallAddress,
    Multicall.abi,
    dataFeedWallet
  );

  console.log("dataFeedContract initialized at: ", oracleAddress);
  console.log("multicallContract initialized at: ", multicallAddress);

  console.log("=============== FETCHING VALIDATORS ===============");

  try {
    await fetchValidatorFinalData(
      dataFeedContract,
      multicallContract,
      oracleAddress,
      provider
    );
    res.status(200).json({ message: `Updated oracle state at ${Date.now()}` });
  } catch (error) {
    res.status(500).end(error.message);
  }
}
