const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const PLATFORM_FEE = BigInt(5e18);
const AUTHOR_FEE = BigInt(1e19);

module.exports = buildModule("PublishModule2", (m) => {
  // const sakura = m.contract("Sakura");
  const publish = m.contract("Publish",['0xd40F61dC2aB79c7eCf715f04985bB155d17677aa', PLATFORM_FEE, AUTHOR_FEE]);
  return { publish };
});
