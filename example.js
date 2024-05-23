const lighthouse = require("@lighthouse-web3/sdk");
const dotenv = require("dotenv");

dotenv.config();
// ... other code

async function uploadFile() {
    const filePath = '/home/simone/HelloOsiris.txt'; // change the path of your file
    const APIKey = process.env.LIGTHOUSE_API_KEY;// the API key from the lighthouse account
    const uploadResponse = await lighthouse.upload(filePath, APIKey);

    console.log("uploadResponse", uploadResponse);
}

uploadFile();