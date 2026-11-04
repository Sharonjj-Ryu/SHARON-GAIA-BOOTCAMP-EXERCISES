# ============================================================
# PDF Text Summarizer API
# ------------------------------------------------------------
# A small web API that accepts a PDF file, pulls out its text,
# and asks Google's Gemini model to write a short summary.
#
# How to run it:
#   1. Install the packages:
#        pip install fastapi uvicorn python-multipart pypdf python-dotenv langchain-google-genai
#   2. Put your API key in a .env file in this folder:
#        GEMINI_API_KEY=your-key-here
#   3. Start the server:
#        uvicorn Text_summ:app --reload
#   4. Open http://127.0.0.1:8000/docs in your browser, choose
#      POST /summarize, click "Try it out" and upload a PDF.
# ============================================================

import os                      # Reads environment variables (our API key)
from io import BytesIO         # Wraps raw bytes so they act like a file
from dotenv import load_dotenv # Loads the variables in the .env file
from pypdf import PdfReader    # Opens PDF files and extracts their text
from fastapi import FastAPI, UploadFile, File, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Create the web application. Every route below (such as /summarize)
# is attached to this "app" object.
app = FastAPI()

# Read the .env file so os.getenv() can find GEMINI_API_KEY.
load_dotenv()

# ------------------------------------------------------------
# 1. The AI model
# ------------------------------------------------------------
# Look for the key under the usual name GEMINI_API_KEY. If it is
# not there, fall back to the old spelling GEMINI_API-KEY so the
# code still works with an older .env file.
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GEMINI_API-KEY")

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=api_key,
)

# ------------------------------------------------------------
# 2. The prompt
# ------------------------------------------------------------
# A prompt template is a message with a blank to fill in. {text}
# is replaced with the text taken from the PDF.
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "Write a concise summary of the following: \n\n{text}\n\nCONCISE SUMMARY: ")
])

# ------------------------------------------------------------
# 3. The chain
# ------------------------------------------------------------
# The "|" symbol links the steps together, so data flows left to right:
#   prompt_template -> fills in {text}
#   llm             -> sends the prompt to Gemini
#   StrOutputParser -> turns Gemini's reply into a plain string
chain = prompt_template | llm | StrOutputParser()


# ------------------------------------------------------------
# 4. Helper function: read the text out of a PDF
# ------------------------------------------------------------
def read_pdf_file(file_contents: BytesIO) -> str:
    """Return all the text in a PDF, joined page by page."""
    try:
        pdf_reader = PdfReader(file_contents)
        # extract_text() can return None for pages with no text (for
        # example scanned images), so "or ''" uses an empty string instead.
        return "\n".join(page.extract_text() or "" for page in pdf_reader.pages)
    except Exception as e:
        # The file could not be read as a PDF (it may be damaged).
        # 400 = "Bad Request": the problem is the uploaded file.
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {e}")


# ------------------------------------------------------------
# 5. The API endpoint
# ------------------------------------------------------------
# @app.post("/summarize") means: when someone sends a POST request
# to /summarize, run this function.
@app.post("/summarize")
async def summarize_pdf(file: UploadFile = File(...)):
    # Step 1: make sure the upload is a PDF file.
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Step 2: read the uploaded file and pull out its text.
    contents = await file.read()
    text = read_pdf_file(BytesIO(contents))

    # Step 3: stop if the PDF has no text (for example, scanned images only).
    if not text.strip():
        raise HTTPException(status_code=400, detail="No readable text found.")

    # Step 4: send the text to Gemini and wait for the summary.
    try:
        summary = await chain.ainvoke({"text": text})
    except Exception as e:
        # Print the real error in the terminal so you can see what went wrong
        # (for example a wrong API key or model name).
        print(e)
        # 500 = "Internal Server Error": the problem is on our side.
        raise HTTPException(status_code=500, detail="An error occurred while summarizing the document.")

    # Step 5: send the summary back to the user as JSON.
    return {"summary": summary}
