import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const signer = new ethers.Wallet(
    process.env.MAINNET_PRIV_KEY || "",
    ethers.provider
  );
  console.log(
    `Deploying Soulbound with the account: ${signer.address} to ${process.env.TARA_MAINNET_URL}`
  );
  const castor = await ethers.deployContract("Castor", signer);

  console.log(castor);

  const contract = await castor.waitForDeployment();

  console.log(`Soulbound deployed to ${contract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
