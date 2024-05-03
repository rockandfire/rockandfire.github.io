pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//
contract NFTMarketplace is ERC721 {
    address public owner;
    uint256 public tokenId = 0;

    struct NFT {
        address owner;
        uint256 id;
        uint256 price;
        string description;
        bool isForSale;
    }

    mapping(uint256 => NFT) public nfts;

    event NFTMinted(uint256 indexed _id, uint256 _price);
    event NFTForSale(uint256 indexed _id, uint256 _price);
    event NFTSold(uint256 indexed _id, address _newOwner);

    constructor() ERC721("NFT Marketplace", "NFTM") {
        owner = msg.sender;
    }

    //mint new nft with a starting price and description
    function mintNFT(address _owner, uint256 _price, string calldata description) external returns (uint256) {
        uint256 newTokenId = tokenId++;
        _safeMint(_owner, newTokenId);
        nfts[newTokenId] = NFT(_owner, newTokenId, _price, description, false);
        emit NFTMinted(newTokenId, _price);
        return newTokenId;
    }

    //puts up an nft for sale at a specified price
    //only allows this if current owner
    function sellNFT(uint256 _tokenId, uint256 _price) external {
        require(msg.sender == nfts[_tokenId].owner, "Only owner can sell NFT");
        require(nfts[_tokenId].isForSale == false, "NFT is already for sale");
        nfts[_tokenId].price = _price;
        nfts[_tokenId].isForSale = true;
        emit NFTForSale(_tokenId, _price);
    }

    //facilitates the purchase of NFT if it is for sale
    //contract pays out to original owner after transfer
    function buyNFT(uint256 _tokenId) external payable {
        require(nfts[_tokenId].isForSale == true, "NFT is not for sale");
        require(msg.value >= nfts[_tokenId].price, "Not enough Ether to buy NFT ");
        address seller = nfts[_tokenId].owner;
        nfts[_tokenId].isForSale = false;
        nfts[_tokenId].price = 0;
        nfts[_tokenId].owner = msg.sender;
        _transfer(seller, msg.sender, _tokenId);
        address payable wallet = payable(seller);
        wallet.transfer(msg.value);
        emit NFTSold(_tokenId, msg.sender);
    }

    //returns a list of all nfts
    function getNFT() public view returns (NFT[] memory) {
        NFT[] memory ret = new NFT[](tokenId);
        for (uint i = 0; i < tokenId; i++) {
            ret[i] = nfts[i];
        }
        return ret;
    }
}