const hre = require("hardhat");

async function main() {
  await hre.run("verify:verify", {
    address: "0x5a57F6041038e2C6a5Bd7e96f4a48C1c0efa6A57",
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