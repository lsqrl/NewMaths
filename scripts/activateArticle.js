require('dotenv').config();
const { ethers } = require("ethers");
const PUBLISH_ABI = require("../abi/publishAbi.json");
const yargs  = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');

const { API_KEY, PRIVATE_KEY } = process.env;

const argv = yargs(hideBin(process.argv))
    .option('articleId', {
        type: 'number',
        describe: 'ID of the article',
        demandOption: true, // Ensure this option is required
        coerce: (num) => {
            const intNum = parseInt(num, 10);
            if (isNaN(intNum)) {
                throw new Error(`Invalid articleId: ${num}`);
            }
            return intNum;
        }
    })
    .help()
    .argv;

const articleId = argv.articleId;

async function main() {
    const CONTRACT_ADDRESS = "0x5a57F6041038e2C6a5Bd7e96f4a48C1c0efa6A57";

    const provider = new ethers.AlchemyProvider("arbitrum-sepolia", API_KEY); 
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PUBLISH_ABI, wallet);

    const result = await contract.activateArticle(articleId);
    console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });