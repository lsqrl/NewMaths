#######################
# Import libraries
import streamlit as st
import pandas as pd
import altair as alt
import plotly.express as px
import subprocess
import os
import sys
from datetime import datetime

#######################
# Page configuration
st.set_page_config(
    page_title="Sakura",
    page_icon="🌺",
    layout="wide",
    initial_sidebar_state="expanded")

alt.themes.enable("dark")

path = 'history.csv'
address = "0x"
file_size = 0
        

import base64
def sidebar_bg(side_bg):

   side_bg_ext = 'gif'

   st.markdown(
      f"""
      <style>
      [data-testid="stSidebar"] > div:first-child {{
          background: url(data:image/{side_bg_ext};base64,{base64.b64encode(open(side_bg, "rb").read()).decode()});
      }}
      </style>
      """,
      unsafe_allow_html=True,
      )
side_bg = 'background_left.png'
sidebar_bg(side_bg)


#######################
# Sidebar
compiles = False
with st.sidebar:
    st.title('🌺 Sakura: automated reviewer & fair publisher')
    with st.expander('Powered by', expanded=True):
        st.page_link("https://www.rainbowkit.com/", label="Rainbowkit - wallet connection", icon="🌈")
        st.page_link("https://lean-lang.org/about/", label="Lean programming language", icon="👩🏼‍💻")
        st.page_link("https://github.com/leanprover-community/mathematics_in_lean", label="Lean theorem dataset", icon="🧮")
        st.page_link("https://filecoin.io/", label="Filecoin", icon="🪙")
        st.page_link("https://streamlit.io/", label="Streamlit framework", icon="🏗️")

# URL of the rainbowkit deployment to embed
website_url = "http://localhost:3000"  # Replace with the URL of the website you want to embed

with st.expander('Connect your wallet', expanded=True):
    # Embed the website using an iframe
    st.components.v1.iframe(website_url, width=800, height=500)#, scrolling=True)
uploaded_files = st.file_uploader("Choose a .lean file", accept_multiple_files=True)
for uploaded_file in uploaded_files:
    bytes_data = uploaded_file.read()
    file_size = sys.getsizeof(bytes_data)
    file_name = uploaded_file.name
    st.write("Bytes: ", file_size)
    st.write("File name:", uploaded_file.name)
    st.write(bytes_data)
    with open(os.path.join("Leanproject", file_name), "wb") as f:
        f.write(bytes_data)
    # add a new line for the new file
    with open('Leanproject.lean', 'r') as f:
        last_line = f.readlines()[-1]
    with open('Leanproject.lean', 'a') as file:
        file.write(str(last_line).partition(".")[0] + "." + file_name.partition(".")[0])
    #result = subprocess.call(["lean", "--run", "my_file.lean"])
    result = subprocess.call(["lake", "build"])
    st.write("Compile result: ", result)
    if result:
        st.write("Review failed")
        os.remove(os.path.join("Leanproject", file_name))
        # File was faulty so remove it from the list to not break future builds
        with open('Leanproject.lean', 'r') as f:
            all_but_last_line = f.readlines()[:-1]
        with open('Leanproject.lean', 'w') as f:
            f.writelines(all_but_last_line)
    else:
        st.write("Review succeeded")
        # wallet_address = ""
        # citations = "1 2 3"
        #result = subprocess.call(["node", os.path.join("scripts", "publish.js"), "--author", wallet_address, "--citations", citations])
        compiles = True

def publish_history():
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    header = ["Timestamp", "WalletAddress", "FileSize [Byte]"]
    df = pd.DataFrame(data = [(dt_string, address, file_size)], columns = header)
    if not os.path.isfile(path):
        df.to_csv(path, columns = header)
    else:
        df.to_csv(path, mode='a', header=False)
    st.write(pd.read_csv(path))
    st.write("Submitting to the chain")
    #os.environ["LIGTHOUSE_API_KEY"]=TODO
    #result = subprocess.call(["node", "uploadFile.js", os.path.join("Leanproject", file_name)])
    #st.write("Uploading ", os.path.join("Leanproject", file_name))
    #st.write(result)
    # article_id = 1
    #result = subprocess.call(["node", os.path.join("scripts", "activateArticle.js"), "--articleId", str(article_id)])
    compiles = False
    
if compiles:
    # if the file compiles we would like to know what is the price for publishing it and also
    # who to reward for the citations
    
    # we need to mint an NFT in order to retrieve the PoDSIs from the network
    # so we will have the address of the authors and list of PoDSIs to award them
    st.write("Esimated cost of publishing: ")
    #st.
    st.button("Publish", on_click=publish_history)


