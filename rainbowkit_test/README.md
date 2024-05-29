# Rainbowkit-streamlit app
Since RainbowKit is a React component, you need to serve a React application alongside your Streamlit application. This involves setting up a simple React app that uses RainbowKit and embedding it in your Streamlit app.

First, set up a React application in a subdirectory:
```shell
npx create-react-app rainbowkit-app
cd rainbowkit-app
```
and install dependencies:
```shell
npm install @rainbow-me/rainbowkit wagmi ethers
```


# How to run the apps
## Rainbowkit app
## Streamlit app
```shell
streamlit run streamlit_app/app.py
```
