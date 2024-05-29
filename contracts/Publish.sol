// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Publish is ERC721, Ownable {

    IERC20 public rewardToken;
    uint256 public id;
    uint256 public minimumPublicationCost;

    struct ArticleData {
        address author;
        uint256 availableRewards;
        uint256[] citations;
        bool hasPoDSI;
    }

    mapping(uint256 => uint256) public publicationCost;
    mapping(uint256 => ArticleData) public articles;

    constructor(address _rewardToken, uint256 _minimumPublicationCost) ERC721("Publish", "PUB") Ownable(msg.sender) {
        rewardToken = IERC20(_rewardToken);
        minimumPublicationCost = _minimumPublicationCost;
    }

    // Once the server has verified the article, it can set the publication cost
    // This also includes having the PoDSI and checking that all citations are incldued
    function setPublicationCost(address author, uint256 cost, uint256[] calldata citations) public onlyOwner {
        require(cost > 0, "cost must be greater than 0");
        require(cost >= minimumPublicationCost, "cost must be greater than minimumPublicationCost");
        
        id++;
        articles[id] = ArticleData(author, 0, citations, false);
        _mint(author, id);

        publicationCost[id] = cost;
    }

    function activateArticle(uint256 tokenId) public {
        ArticleData storage article = articles[tokenId];
        uint256 pubCost = publicationCost[tokenId];
        require(!article.hasPoDSI, "article already activated");
        require(pubCost > 0, "publication cost not set");
        require(rewardToken.transferFrom(msg.sender, address(this), pubCost), "transfer failed");
        pubCost -= minimumPublicationCost;
        delete publicationCost[tokenId];
        uint256 remainingToCite = article.citations.length;
        while (remainingToCite > 0) {
            require(articles[article.citations[remainingToCite - 1]].hasPoDSI, "citing not activated article");
            articles[article.citations[remainingToCite - 1]].availableRewards += pubCost / remainingToCite;
            pubCost -= pubCost / remainingToCite;
            remainingToCite--;
        }
        article.hasPoDSI = true;
    }

    function withdrawRewards(uint256 tokenId) public {
        ArticleData storage article = articles[tokenId];
        require(article.hasPoDSI, "article not activated");
        require(article.availableRewards > 0, "no rewards available");
        article.availableRewards = 0;
        require(rewardToken.transfer(article.author, article.availableRewards), "transfer failed");
    }
}