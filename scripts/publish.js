require('dotenv').config();
const { ethers } = require("ethers");
const PUBLISH_ABI = require("../abi/publishAbi.json");
const yargs  = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');

const { API_KEY, PRIVATE_KEY } = process.env;

const argv = yargs(hideBin(process.argv))
    .option('citations', {
        type: 'array',
        describe: 'Array of citation integers',
        coerce: (arr) => {
            if (!Array.isArray(arr)) {
                throw new Error('Citations must be an array.');
            }
            const intArr = arr.map(num => {
                const intNum = parseInt(num, 10);
                if (isNaN(intNum)) {
                    throw new Error(`Invalid number: ${num}`);
                }
                return intNum;
            });
            return intArr;
        },
        default: []
    })
    .option('author', {
        type: 'string',
        describe: 'Ethereum address of the author',
        coerce: (addr) => {
            if (!ethers.isAddress(addr)) {
                throw new Error(`Invalid Ethereum address: ${addr}`);
            }
            return addr;
        }
    })
    .help()
    .argv;

const authorAddress = argv.author;
const citations = argv.citations;

console.log(`Author address is: ${authorAddress}`);
console.log(`Citations are: ${citations}`);

async function main() {
    const CONTRACT_ADDRESS = "0x5a57F6041038e2C6a5Bd7e96f4a48C1c0efa6A57";

    const provider = new ethers.AlchemyProvider("arbitrum-sepolia", API_KEY); 
    
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const balance = await provider.getBalance("0x2F983dbe1c1ebeAd744eE6211F5CCF84E76A98D3");
    console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, PUBLISH_ABI, wallet);
    const result = await contract.prePublish(authorAddress, citations);
    console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });