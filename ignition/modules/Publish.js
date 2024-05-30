const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const PLATFORM_FEE = BigInt(5e18);
const AUTHOR_FEE = BigInt(1e19);

module.exports = buildModule("PublishModule", (m) => {
  const sakura = m.contract("Sakura");
  const publish = m.contract("Publish",[sakura, PLATFORM_FEE, AUTHOR_FEE]);
  return { sakura, publish };
});
