# 🌺 Sakura: automated reviewer & fair publisher
Proposal of a Filecoin smart contract suite for mathematical proofs, based on Lean theorem prover

# How to use
## Installing the language support
Make sure to have all of the following installed:
- python
- pip for python package management
- node.js
- lean4 

Keep in mind: *lean* comes with a command line tool called *lake* that enables custo theorem imports.
## Installing the packages
Installing the python dependencies:
```shell
pip install -r requirements.txt
```

Installing the node dependencies:
```shell
npm install
npm install -g --no-fund @lighthouse-web3/sdk
npx hardhat compile
```
# How to run
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
TODO
```
## Running the sakura server
Execute the following command:
```shell
streamit run sakura.py
```
