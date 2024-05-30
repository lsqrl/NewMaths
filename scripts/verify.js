const hre = require("hardhat");

async function main() {
  await hre.run("verify:verify", {
    address: "0x200E55782226930c7EAfCaa67033D0102a0Dd4F7",
    constructorArguments: [
      "0xd40F61dC2aB79c7eCf715f04985bB155d17677aa",
      "5000000000000000000",
      "10000000000000000000"
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });