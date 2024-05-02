// Prereqs:
// First install npm
// mkdir SimpleBank
// cd SimpleBank
// npm init -y
// npm install web3

const { Web3 } = require('web3');

// Configuration
const web3 = new Web3(`https://sepolia.infura.io/v3/3ebf718a77564b9a942336c7df67582f`);
const account = "0xd85AB49EdA0Cc7045025F01BDDA4b76Ef44fE6e7";
const privateKey = "a4e4e96ce220065a04b64cd088cfc8f4159e715339ecb9037e834f18773895af"; // Be cautious with your private key
const simpleBankContractAddress = "0x4885562F2e34a87f102469c69cB6eb605E857f78";
const simpleBankABI = [
    // Simplified ABI with only the methods we'll interact with
    {
        "constant": false,
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "withdrawAmount", "type": "uint256"}],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function depositEther(amount) {
    const simpleBank = new web3.eth.Contract(simpleBankABI, simpleBankContractAddress);
    const transaction = simpleBank.methods.deposit();
    const options = {
        to: simpleBankContractAddress,
        from: account,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({from: account}),
        gasPrice: await web3.eth.getGasPrice(),
        value: web3.utils.toWei(amount.toString(), 'ether')
    };

    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction receipt:', receipt);
}

async function withdrawEther(amount) {
    const simpleBank = new web3.eth.Contract(simpleBankABI, simpleBankContractAddress);
    const transaction = simpleBank.methods.withdraw(web3.utils.toWei(amount.toString(), 'ether'));
    const options = {
        to: account,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({from: account}),
        gasPrice: await web3.eth.getGasPrice(),
    };

    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction receipt:', receipt);
}

// Example usage
withdrawEther(0.01);

