# 🌺 Sakura: automated reviewer & fair publisher
Proposal of a Filecoin smart contract suite for mathematical proofs, based on Lean theorem prover

# How to use
## Installing the language support
Make sure to have all of the following installed:
- python
- pip for python package management
- node.js
- lean4 

Keep in mind: *lean* comes with a command line tool called *lake* that enables custom theorem imports.
## Installing the packages
Installing the python dependencies:
```shell
pip install -r requirements.txt
```

Installing the node dependencies:
```shell
npm install
npm install next
npm install -g --no-fund @lighthouse-web3/sdk
```
# How to run
## Compile the smart contract
We are going to be using the hardhat 
```shell
npx hardhat compile
```
## Enable lean theorem prover
Before running the application run:
```shell
lake update
lake build
```
If there are issues run:
```shell
lake clean
```
## Running the rainbowkit server
Rainbowkit will provide the wallet related functionalities
```shell
cd rainbowkit-app
npm install next
npm run build
npm run dev
```
## Running the sakura server
Make sure that the URL of the rainbowkit server is correct:
Execute the following command:
```shell
streamit run sakura.py
```

## Interacting with the smart contract
We have three main scripts:
- publish.js, which can be launched only by the owner of the contract (i.e. the server), with the syntax node publish.js --author [author] --citations [cit1] [cit2] [...]
- activateArticle.js, which can be launched by anybody and triggers a pull payment by the Publish.sol contract, syntax node activateArticle.js --articleId [id]
- getCitations.js, just a view function, syntax node getCitations.js --articleId [id]