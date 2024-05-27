// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Publish is ERC721, Ownable {

    address public server;
    IERC20 public rewardToken;
    uint256 public id;

    struct ArticleData {
        address author;
        uint256 availableRewards;
        uint256[] citations;
        bool hasPoDSI;
    }

    mapping(uint256 => uint256) public publicationCost;
    mapping(uint256 => ArticleData) public articles;

    constructor(address _server, address _rewardToken) ERC721("Publish", "PUB") Ownable(msg.sender) {
        server = _server;
        rewardToken = IERC20(_rewardToken);
    }

    function changeServer(address _server) public onlyOwner {
        server = _server;
    }

    function burn(uint256 tokenId) public onlyOwner {
        ArticleData memory article = articles[tokenId];
        delete articles[tokenId];
        // transfer remaining rewards to author
        require(rewardToken.transfer(article.author, article.availableRewards), "transfer failed");
        _burn(tokenId);
    }

    // Once the server has verified the article, it can set the publication cost
    // This also includes having the PoDSI and checking that all citations are incldued
    function setPublicationCost(uint256 tokenId, uint256 cost) public onlyOwner {
        require(cost > 0, "cost must be greater than 0");
        publicationCost[tokenId] = cost;
    }

    function publish(address author, uint256[] memory citations) public {
        id++;
        articles[id] = ArticleData(author, 0, citations, false);
        _mint(author, id);
    }

    function activateArticle(uint256 tokenId) public {
        ArticleData storage article = articles[tokenId];
        uint256 pubCost = publicationCost[tokenId];
        require(!article.hasPoDSI, "article already activated");
        require(pubCost > 0, "publication cost not set");
        require(rewardToken.transferFrom(msg.sender, address(this), pubCost), "transfer failed");
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