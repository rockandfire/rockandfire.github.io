import {
MetaMaskButton, useAccount,
useSDK,
useSignMessage
} from '@metamask/sdk-react-ui';
import NavMenu from './NavMenu';
import SearchForm from './SearchForm';
import Listing from './Listing';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import React, { useState } from 'react';  
import GridSystem from './ListingsContainer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { createRoot } from 'react-dom/client';
import { Alert } from 'react-bootstrap';



const { Web3 } = require('web3');
const { ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } = require("web3");
const network = "sepolia";
const web3 = new Web3(`https://sepolia.infura.io/v3/3ebf718a77564b9a942336c7df67582f`);
const simpleBankContractAddress = "0x2a2E7d814e28043739d0F0D2478c4495A7FdDdbb";
const simpleBankABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "NFTForSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "NFTMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "NFTSold",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNFT",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isForSale",
						"type": "bool"
					}
				],
				"internalType": "struct NFTMarketplace.NFT[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "mintNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nfts",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isForSale",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "sellNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const simpleBank = new web3.eth.Contract(simpleBankABI, simpleBankContractAddress);

let accounts = [];
getAccount();

const createCards = async () => {
    var varTest = [];

    try{
        let nftCreatedEvents = await simpleBank.methods.getNFT().call()
        .then(function(result) {
            varTest = result.map(_ev => _ev);
        }).then(function() {
            console.log(varTest);
        });

        const renderNFT = (card, index) => { 
            let buyButton = <Button variant="primary" onClick={() => buyNFT(card.id, card.price)} disabled>Out of Stock</Button>;
            let sellButton;
            let priceInfo;
            let priceInfoDiv;
            if (card.isForSale) {                            
                buyButton = <Button variant="primary" onClick={() => buyNFT(card.id, card.price)}>Buy NFT</Button>;
            }
            console.log('bruh!', card.owner.toLowerCase(), accounts[0], card.owner.toLowerCase().localeCompare(accounts[0]))
            if (card.owner.toLowerCase().localeCompare(accounts[0]) == 0 && !card.isForSale) {
                priceInfo = <input id={index.toString()} type="number" min="0" placeholder={Number(card.price)}></input>
                priceInfoDiv = <div>New price (Wei) {priceInfo}</div>
                sellButton = <Button variant="primary" onClick={() =>  {sellNFT(card.id, document.getElementById(index.toString()).value)}}>Sell NFT</Button>;
            }

            return (
                <Col>
                    <Card style={{ width: '18rem' }} key={index}>
                        {/* <Card.Img variant="top" src={card.url}/> */}
                        <Card.Body>
                            <Card.Title>{card.id.toString()}</Card.Title>
                            <Card.Text>
                                <div>ID: {card.id.toString()}</div>
                                <div>Price: {web3.utils.fromWei(card.price.toString(), 'ether')} Eth</div>
                                <div>Description: {card.description}</div>
                                {priceInfoDiv}
                            </Card.Text>
                            {buyButton}
                            {sellButton}
                        </Card.Body>
                    </Card>
                </Col>
            );
        }

        let cards = varTest.map(renderNFT);

        const root = createRoot(document.getElementById("value"));
        root.render(cards);
    }
    catch(error) {
        // setTimeout(window.location.reload(), 10);
    }
}

async function getAccount() {
    accounts = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
    .request({ method: "eth_requestAccounts" });
}

async function buyNFT(tokenId, price) {
	const transaction = simpleBank.methods.buyNFT(tokenId);

	await window.ethereum // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "eth_sendTransaction",
      // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
      params: [
        {
          // The user's active address.
          from: accounts[0],
          // Required except during contract publications.
          to: simpleBankContractAddress,
          // Only required to send ether to the recipient from the initiating external account.
          value: parseInt(price).toString(16),
          // Customizable by the user during MetaMask confirmation.
          data: transaction.encodeABI(),

        },
      ],
    })
    .then((txHash) => prompt("Copy to clipboard: Ctrl+C, Enter", txHash))
    .catch((error) => alert(error));

    createCards();
}

async function sellNFT(tokenId, price) {
    
    try {
        const transaction2 = simpleBank.methods.sellNFT(tokenId, price);

	await window.ethereum // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "eth_sendTransaction",
      // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
      params: [
        {
			// The user's active address.
			from: accounts[0],
			// Required except during contract publications.
			to: simpleBankContractAddress,
			// Only required to send ether to the recipient from the initiating external account.
			value: '0x0',
			// Customizable by the user during MetaMask confirmation.
			data: transaction2.encodeABI(),

        },
      ],
    })
    .then((txHash) => prompt("Copy to clipboard: Ctrl+C, Enter", txHash))
    .catch((error) => alert(error));
    }
    catch(error) {
        const errormsg = () => {
            return(
                <Alert variant="outlined" severity="info">
                    Error executing transaction. Ensure a price is set.
                </Alert> 
            );
        }

        const root = createRoot(document.getElementById("value"));
        root.render(errormsg);
    }

    createCards();
    
}

function RecentTx() {

    createCards();
    
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    let bruharr = [
        <div>
            <h3>0</h3>
            <h2>0</h2>
        </div>,
        <div>
            <h3>1</h3>
            <h2>1</h2>
        </div>
    ]

    return (
        <Container>
            <Row id="value">
                
            </Row>
        </Container>
    )
    
}

export default RecentTx;
