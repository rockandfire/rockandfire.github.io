# rockandfire.github.io

# Project Overview

This is a React project created for CS 5833. The site allows users to connect a wallet with Metamask, and mint, sell, and buy NFT listings. Since this site interacts with the Ethereum Sepolia Testnet, there is no conventional backend. All data is pulled directly from the blockchain using Infura, which is then updated periodically to prevent users from interacting with stale listings.

# Contract Details

This site uses a Solidity smart contract based on OpenZeppelin's ERC721 template. The contract allows users to mint, sell, and buy NFT listings, and metadata such as ID numbers, descriptions, prices, and owners are all stored on-chain. The activity of this contract can be found at https://sepolia.etherscan.io/address/0x2a2e7d814e28043739d0f0d2478c4495a7fdddbb.
This contract was created using Remix IDE.
