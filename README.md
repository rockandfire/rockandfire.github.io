# rockandfire.github.io

# Project Overview

This is a React project created for CS 5833. The site allows users to connect a wallet with Metamask, and mint, sell, and buy NFT listings. Since this site interacts with the Ethereum Sepolia Testnet, there is no conventional backend. All data is pulled directly from the blockchain using Infura, which is then updated periodically to prevent users from interacting with stale listings.

<img width="1512" alt="Screenshot 2024-05-03 at 10 21 48 PM" src="https://github.com/rockandfire/rockandfire.github.io/assets/55259268/d14758d3-ee2e-4e62-80b9-2ba01c48bef1">

# Contract Details

This site uses a Solidity smart contract based on OpenZeppelin's ERC721 template. The contract allows users to mint, sell, and buy NFT listings, and metadata such as ID numbers, descriptions, prices, and owners are all stored on-chain. The activity of this contract can be found at https://sepolia.etherscan.io/address/0x33fBB9aCDaDE2fC2C91804e409CE76A910f051B2.
This contract was created and deployed on the Sepolia testnet using Remix IDE.

The contract has four major interactions:

1. Mint NFT: Creates a new NFT while mapping an owner (message sender) and a price provided by the sender. This method automatically updates an array of NFTs, which the frontend then displays.

2. Sell NFT: Accesses an existing NFT from the array and lists it for sale with its current price, or a provided one. The price is required to be greater than or equal to 0, and the message sender must be the owner of the NFT.

3. Buy NFT: Purchases an NFT already listed for sale. This method requires that the message value is at least as much as the listed price, and this method facilitates the ownership transfer of the NFT as well as the payout to the seller.

4. Get NFT: Returns the array of all NFTs in the marketplace. This method is view only, and takes no input.
