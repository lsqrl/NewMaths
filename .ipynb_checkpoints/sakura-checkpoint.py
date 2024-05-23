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
        st.page_link("https://lean-lang.org/about/", label="Lean programming language", icon="👩🏼‍💻")
        st.page_link("https://github.com/leanprover-community/mathematics_in_lean", label="Lean theorem dataset", icon="🧮")
        st.page_link("https://filecoin.io/", label="Filecoin", icon="🪙")
        st.page_link("https://streamlit.io/", label="Streamlit framework", icon="🏗️")

address = st.text_input("Please enter your wallet's address", value="")
uploaded_files = st.file_uploader("Choose a .lean file", accept_multiple_files=True)
for uploaded_file in uploaded_files:
    bytes_data = uploaded_file.read()
    file_size = sys.getsizeof(bytes_data)
    st.write("Bytes: ", file_size)
    st.write("File name:", uploaded_file.name)
    st.write(bytes_data)
    with open("my_file.lean", "wb") as f:
        f.write(bytes_data)
    result = subprocess.call(["lean", "--run", "my_file.lean"])
    if result:
        st.write("Review failed")
    else:
        st.write("Review succeeded")
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
if compiles:
    st.button("Publish", on_click=publish_history)
    st.write("Submitting to the chain")
    #os.environ["LIGTHOUSE_API_KEY"]=TODO
    #result = subprocess.call(["node", "uploadFile.js", "my_file.lean"])