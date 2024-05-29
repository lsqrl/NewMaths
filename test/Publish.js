const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sakura", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySakuraFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Sakura = await ethers.getContractFactory("Sakura");
    const sakura = await Sakura.deploy();

    return { sakura, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should set the right balance", async function () {
      const { sakura, owner } = await loadFixture(deploySakuraFixture);

      expect(await sakura.balanceOf(owner.address)).to.equal(ethers.parseUnits("100000000", 18));
    });

  });

});
