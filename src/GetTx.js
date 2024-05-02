const { Web3 } = require('web3');

// Configuration
const web3 = new Web3(`https://sepolia.infura.io/v3/3ebf718a77564b9a942336c7df67582f`);
const account = "0xd85AB49EdA0Cc7045025F01BDDA4b76Ef44fE6e7";
const privateKey = "a4e4e96ce220065a04b64cd088cfc8f4159e715339ecb9037e834f18773895af"; // Be cautious with your private key
const simpleBankContractAddress = "0xe6F30d30973148D1B3a24EE62289d2ED73bd5a8e";
const simpleBankABI = [
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
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
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
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
						"name": "price",
						"type": "uint256"
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
				"name": "price",
				"type": "uint256"
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
	}
]
var MyContract = new web3.eth.Contract(simpleBankABI, simpleBankContractAddress)

// mintNFT();

const getAll = () => {
    MyContract.methods
      .getAll()
      .call({}, function(error, list){
          console.log(list); 
     });;
  };

// MyContract.getPastEvents('NFTMinted', {
//     filter: {}, // Using an array means OR: e.g. 20 or 23
//     fromBlock: 0,
//     toBlock: 'latest'
// }, function(error, events){ console.log(events); })
// .then(function(events){
//     console.log(events) // same results as the optional callback above
// });
// testLogs();
// async function testLogs() {
//     const bruh = await web3.eth.getBlockNumber();
//     const bruh2 = Number(bruh) - 10000;
//     console.log(bruh);
//     console.log(bruh2);
//     // console.log(bruh3);
//     albums = await MyContract.getPastEvents('NFTMinted', {
//         filter: {}, // Using an array means OR: e.g. 20 or 23
//         fromBlock: bruh2,
//         toBlock: 'latest'
// }).then(result => albums = result);}
var varTest = [];

async function bruh() {
    try {
        const bruh = await web3.eth.getBlockNumber();
        const bruh2 = Number(bruh) - 10000;
        console.log(bruh);
        console.log(bruh2);
        // console.log(bruh3);
        var nftCreatedEvents = await MyContract.getPastEvents('NFTMinted', {
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: bruh2,
            toBlock: 'latest'
        }).then(function(result) {
            varTest = result.map(_ev => _ev.returnValues);
        }).then(function() {
            console.log(varTest);
        });
        }catch(e) {
            console.log(e)
        }
    
}


// console.log(varTest);
// bruh();

getNFT();
// let bruh2 = parseInt(web3.utils.toWei((0.01).toString(), 'ether')).toString(16)
// console.log(bruh2);

async function mintNFT() {
    var amount = 0;
    var price = 0.01;
    const simpleBank = new web3.eth.Contract(simpleBankABI, simpleBankContractAddress);
    const transaction = simpleBank.methods.mintNFT(account, web3.utils.toWei(price.toString(), 'ether'));
    // transaction.call({from: account, gas: await transaction.estimateGas({from: account}), gasPrice: await web3.eth.getGasPrice()})
    // .then((result) => console.log(result));

    //     gasPrice: await web3.eth.getGasPrice(),});

    const options = {
        to: simpleBankContractAddress,
        from: account,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({from: account}),
        gasPrice: await web3.eth.getGasPrice(),
        value: web3.utils.toWei(price.toString(), 'ether')
    };

    // const r = await transaction.call(options);
    // console.log(r);
    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction receipt:', receipt);
    // console.log('done')
}

async function getNFT() {
    var amount = 0;
    var price = 0;
    const simpleBank = new web3.eth.Contract(simpleBankABI, simpleBankContractAddress);
    simpleBank.methods.getNFT().call().then(result => console.log(result));
    // transaction.call({from: account, gas: await transaction.estimateGas({from: account}), gasPrice: await web3.eth.getGasPrice()})
    // .then((result) => console.log(result));

    //     gasPrice: await web3.eth.getGasPrice(),});

    // const options = {
    //     to: simpleBankContractAddress,
    //     from: account,
    //     data: transaction.encodeABI(),
    //     gas: await transaction.estimateGas({from: account}),
    //     gasPrice: await web3.eth.getGasPrice(),
    //     value: web3.utils.toWei(price.toString(), 'ether')
    // };

    // // const r = await transaction.call(options);
    // // console.log(r);
    // const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    // const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    // console.log('Transaction receipt:', receipt);
    // console.log('done')
}

async function sellNFT() {
    let price = 0
    const transaction2 = MyContract.methods.sellNFT(9, price);

    const options = {
        from: account,
        // Required except during contract publications.
        to: simpleBankContractAddress,
        // Only required to send ether to the recipient from the initiating external account.
        value: '0x0',
        // Customizable by the user during MetaMask confirmation.
        data: transaction2.encodeABI(),
        gas: await transaction2.estimateGas({from: account}),
        gasPrice: await web3.eth.getGasPrice(),
    };

    // const r = await transaction.call(options);
    // console.log(r);
    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction receipt:', receipt);
}

async function buyNFT() {
    let price = 0.001
    const transaction2 = MyContract.methods.buyNFT(9);

    const options = {
        from: account,
        // Required except during contract publications.
        to: simpleBankContractAddress,
        // Only required to send ether to the recipient from the initiating external account.
        value: parseInt(web3.utils.toWei((price).toString(), 'ether')).toString(16),
        // Customizable by the user during MetaMask confirmation.
        data: transaction2.encodeABI(),
        gas: await transaction2.estimateGas({from: account}),
        gasPrice: await web3.eth.getGasPrice(),
    };

    // const r = await transaction.call(options);
    // console.log(r);
    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction receipt:', receipt);
}