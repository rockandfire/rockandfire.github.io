//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//
contract NFTMarketplace is ERC721 {
    uint256 public nftId = 0;

    struct NFT {
        address owner;
        uint256 id;
        uint256 price;
        string description;
        bool isForSale;
    }

    mapping(uint256 => NFT) public nftsInMem;

    event NFTMinted(uint256 indexed _id, uint256 _price);
    event NFTForSale(uint256 indexed _id, uint256 _price);
    event NFTSold(uint256 indexed _id, address _newOwner);

    constructor() ERC721("5833 Market", "5833") {
    }

    //returns a list of all nfts
    function getNFT() public view returns (NFT[] memory) {
        NFT[] memory nftArray = new NFT[](nftId);
        for (uint i = 0; i < nftId; i++) {
            nftArray[i] = nftsInMem[i];
        }
        return nftArray;
    }

    //mint new nft with a starting price and description
    function mintNFT(address owner, uint256 price, string calldata description) external {
        uint256 newTokenId = nftId;
        
        _safeMint(owner, newTokenId);
        nftsInMem[newTokenId] = NFT(owner, newTokenId, price, description, false);

        emit NFTMinted(newTokenId, price);

        nftId++;

    }

    //puts up an nft for sale at a specified price
    //only allows this if current owner
    function sellNFT(uint256 id, uint256 price) external {

        //dont relist and dont list if not owner
        require(msg.sender == nftsInMem[id].owner);
        require(nftsInMem[id].isForSale == false);

        //set price and sell bool
        nftsInMem[id].price = price;
        nftsInMem[id].isForSale = true;

        emit NFTForSale(id, price);
    }

    //facilitates the purchase of NFT if it is for sale
    //contract pays out to original owner after transfer
    function buyNFT(uint256 id) external payable {

        //dont allow purchase if not for sale or not paying enough
        require(nftsInMem[id].isForSale == true);
        require(msg.value >= nftsInMem[id].price);

        //transfer in memory
        address seller = nftsInMem[id].owner;
        nftsInMem[id].isForSale = false;
        nftsInMem[id].owner = msg.sender;

        //transfer via 721 contracts
        _transfer(seller, msg.sender, id);

        //payout to sender
        address payable wallet = payable(seller);
        wallet.transfer(msg.value);

        emit NFTSold(id, msg.sender);
    }
}