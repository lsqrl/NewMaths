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
  async function deployPublishFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

    const Sakura = await ethers.getContractFactory("Sakura");
    const sakura = await Sakura.deploy();

    const Publish = await ethers.getContractFactory("Publish");
    const publish = await Publish.deploy(sakura.getAddress(), ethers.parseEther("5"), ethers.parseEther("10")); // 5 for platform, 10 for author

    return { sakura, publish, owner, otherAccount, thirdAccount };
  }

  describe("Deployment", function () {

    it("Should set the right balance", async function () {
      const { sakura, owner } = await loadFixture(deployPublishFixture);

      expect(await sakura.balanceOf(owner.address)).to.equal(ethers.parseUnits("100000000", 18));
    });
    
    it("Should set the right owner", async function () {
      const { publish, owner } = await loadFixture(deployPublishFixture);

      expect(await publish.owner()).to.equal(owner.address);
    }); 
  });

  describe("Publish", function () {
    it("Should publish a new article", async function () {
      const { sakura, publish, owner, otherAccount, thirdAccount} = await loadFixture(deployPublishFixture);

      await sakura.transfer(otherAccount.address, ethers.parseEther("5"));
      await sakura.transfer(thirdAccount.address, ethers.parseEther("15"));

      await publish.prePublish(otherAccount, []);

      let article = await publish.articles(1);
      expect(article.author).to.equal(otherAccount);
      expect(article.hasPoDSI).to.equal(false);

      // user should be able to activate the article

      await sakura.connect(otherAccount).approve(publish.getAddress(), ethers.parseEther("5"));
      await publish.connect(otherAccount).activateArticle(1);

      article = await publish.articles(1);
      expect(article.hasPoDSI).to.equal(true);
      let balance = await sakura.balanceOf(otherAccount.address);
      expect(balance).to.equal(0);

      await publish.prePublish(thirdAccount, [1]);
      await sakura.connect(thirdAccount).approve(publish.getAddress(), ethers.parseEther("15"));
      await publish.connect(thirdAccount).activateArticle(2);

      // check rewards
      const rewards = await sakura.balanceOf(otherAccount.address);
      expect(rewards).to.equal(ethers.parseEther("10"));
    });
  });
});
