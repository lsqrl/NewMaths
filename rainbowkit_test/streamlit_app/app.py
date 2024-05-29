# app.py
import streamlit as st
import streamlit.components.v1 as components

st.title("Streamlit and RainbowKit Integration")

# Load the React app
components.html(
    """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RainbowKit App</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            iframe {
                width: 100%;
                height: 100vh;
                border: none;
            }
        </style>
    </head>
    <body>
        <iframe src="rainbowkit-app/build/index.html"></iframe>
    </body>
    </html>
    """,
    height=800,
)
