const axios = require('axios');
const minimist = require("minimist");

async function getPoDSI(lighthouse_cid, network) {
    let response = await axios.get("https://api.lighthouse.storage/api/lighthouse/get_proof", {
        params: {
            cid: lighthouse_cid,
            network: network
        }
    });
    return response;
}

const args = minimist(process.argv.slice(2));
const cid = args.cid;
const network = args.network;

getPoDSI(cid, network).then(hash => {
    console.log("Returned response:", hash);
}).catch(err => {
    console.error("Error:", err);
});