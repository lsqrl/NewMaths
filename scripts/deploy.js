const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Sakura = await ethers.getContractFactory("Sakura");
  const sakura = await Sakura.deploy();
  await sakura.deployed();
  
  const PLATFORM_FEE = BigInt(5e18);
  const AUTHOR_FEE = BigInt(1e19);

  const Publish = await ethers.getContractFactory("Publish");
  const publish = await Publish.deploy(sakura.address, PLATFORM_FEE, AUTHOR_FEE);
  await publish.deployed();

  console.log("Publish contract deployed to:", publish.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });