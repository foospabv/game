import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts...");
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  console.log("Deployer address:", deployer.address);
  
  const contracts: Record<string, string> = {};
  
  // Deploy your contracts here
  // Example:
  // const Contract = await ethers.getContractFactory("YourContract");
  // const contract = await Contract.deploy();
  // await contract.waitForDeployment();
  // const address = await contract.getAddress();
  // contracts["YOUR_CONTRACT"] = address;
  // console.log("YourContract deployed to:", address);
  
  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("Deployment Summary");
  console.log("=".repeat(60));
  for (const [name, address] of Object.entries(contracts)) {
    console.log(name + ":", address);
  }
  console.log("=".repeat(60));
  
  // Save to contracts.json
  const contractsPath = path.join(__dirname, "..", "contracts.json");
  fs.writeFileSync(contractsPath, JSON.stringify(contracts, null, 2));
  console.log("\nContract addresses saved to contracts.json");
  
  // Save to .env format
  console.log("\nAdd these to your .env file:");
  for (const [name, address] of Object.entries(contracts)) {
    console.log(f"{name}_ADDRESS={address}");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
