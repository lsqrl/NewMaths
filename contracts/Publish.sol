// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Publish is ERC721, Ownable {

    IERC20 public rewardToken;
    uint256 public id;
    uint256 public platformFee;
    uint256 public citationFee;

    struct ArticleData {
        address author;
        uint256[] citations;
        bool hasPoDSI;
    }

    mapping(uint256 => ArticleData) public articles;

    constructor(address _rewardToken, uint256 _platformFee, uint256 _citationFee) ERC721("Publish", "PUB") Ownable(msg.sender) {
        rewardToken = IERC20(_rewardToken);
        platformFee = _platformFee;
        citationFee = _citationFee;
    }

    // Once the server has verified the article, it can set the publication cost
    // This also includes having the PoDSI and checking that all citations are incldued
    function prePublish(address author, uint256[] calldata citations) public onlyOwner {
        id++;
        articles[id] = ArticleData(author, citations, false);
        _mint(author, id);
    }

    function activateArticle(uint256 tokenId) public {
        ArticleData storage article = articles[tokenId];
        require(!article.hasPoDSI, "article already activated");
        require(rewardToken.transferFrom(msg.sender, owner(), platformFee), "platform transfer failed");
        for (uint256 i = 0; i < article.citations.length; i++) {
            require(articles[article.citations[i]].hasPoDSI, "citing not activated article");
            require(
                    rewardToken.transferFrom(msg.sender, 
                        articles[article.citations[i]].author, 
                        citationFee), 
                    "citation transfer failed");
        }
        article.hasPoDSI = true;
    }
}