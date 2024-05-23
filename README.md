# NewMaths
Proposal of a Filecoin smart contract suite for mathematical proofs, based on Lean theorem prover

# How to use
Make sure to have all of the following installed:
- python
- node.js
- lean4

First install all the required python libraries:
```
pip install -r requirements.txt
```

And also library for node:
```
npm install -g --no-fund @lighthouse-web3/sdk
```

To be able to run the file upload insert the following information in sakura.py:
```
os.environ["LIGTHOUSE_API_KEY"]=TODO
```

Run the sakura server:
```
streamit run sakura.py
```
