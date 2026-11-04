# ============================================================
# Exercise 2: PDF Summarizer with Custom Prompt Templates
# ------------------------------------------------------------
# Same idea as Text_summ.py, but now you choose what KIND of
# document you are uploading. Each kind has its own prompt
# template, so the summary focuses on what matters for it:
#
#   general           -> a short, plain summary
#   resume            -> skills, experience, education
#   financial_report  -> key figures, trends, risks
#   academic_paper    -> research question, method, findings
#
# How to run it (from the Week 7 folder):
#   .\.venv\Scripts\python.exe -m uvicorn Text_summ_types:app
#
# Then open http://127.0.0.1:8000 in your browser, pick a
# document type, upload a PDF and click "Summarize".
# (The testing page at http://127.0.0.1:8000/docs still works too.)
# ============================================================

import os                      # Reads environment variables (our API key)
from enum import Enum          # Gives a fixed list of choices (a dropdown in /docs)
from io import BytesIO         # Wraps raw bytes so they act like a file
from dotenv import load_dotenv # Loads the variables in the .env file
from pypdf import PdfReader    # Opens PDF files and extracts their text
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse  # Sends a file (our web page) to the browser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

app = FastAPI(title="PDF Summarizer (by document type)")

load_dotenv()

# ------------------------------------------------------------
# 1. The AI model
# ------------------------------------------------------------
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GEMINI_API-KEY")

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=api_key,
)


# ------------------------------------------------------------
# 2. The document types
# ------------------------------------------------------------
# Because DocumentType is an Enum, FastAPI only accepts these
# exact values and shows them as a dropdown on the /docs page.
class DocumentType(str, Enum):
    general = "general"
    resume = "resume"
    financial_report = "financial_report"
    academic_paper = "academic_paper"


# ------------------------------------------------------------
# 3. One prompt template per document type
# ------------------------------------------------------------
# Every template has the same blank, {text}, which is filled with
# the text from the PDF. What changes is the instructions: the
# system message sets the "expert role", and the human message
# says exactly what the summary must contain.
PROMPT_TEMPLATES = {
    DocumentType.general: ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant."),
        ("human",
         "Write a concise summary of the following:\n\n{text}\n\n"
         "CONCISE SUMMARY:"),
    ]),

    DocumentType.resume: ChatPromptTemplate.from_messages([
        ("system",
         "You are an experienced recruiter who screens resumes quickly "
         "and fairly. Only use information that appears in the resume."),
        ("human",
         "Summarize this resume for a hiring manager using these headings:\n"
         "- Candidate: name and current or most recent job title\n"
         "- Profile: a 2-3 sentence overview of who they are\n"
         "- Key Skills: the most important technical and soft skills\n"
         "- Experience: each role with company, dates and one main achievement\n"
         "- Education & Certifications\n"
         "- Standout Strengths: 2-3 points that make this candidate stand out\n\n"
         "If a section is missing from the resume, write 'Not stated'.\n\n"
         "RESUME:\n{text}\n\n"
         "RESUME SUMMARY:"),
    ]),

    DocumentType.financial_report: ChatPromptTemplate.from_messages([
        ("system",
         "You are a financial analyst who explains company reports clearly. "
         "Copy every number exactly as written and never invent figures."),
        ("human",
         "Summarize this financial report using these headings:\n"
         "- Overview: the company, the period covered and the overall result\n"
         "- Key Figures: revenue, profit or loss, and other important numbers "
         "(include units and currency)\n"
         "- Trends: what went up or down compared with earlier periods, and why\n"
         "- Risks & Concerns: problems or warnings mentioned in the report\n"
         "- Outlook: what the company expects next\n\n"
         "If a figure is not in the report, write 'Not stated'.\n\n"
         "FINANCIAL REPORT:\n{text}\n\n"
         "FINANCIAL SUMMARY:"),
    ]),

    DocumentType.academic_paper: ChatPromptTemplate.from_messages([
        ("system",
         "You are a research assistant who summarizes academic papers "
         "accurately for students. Do not add claims the paper does not make."),
        ("human",
         "Summarize this academic paper using these headings:\n"
         "- Title & Authors\n"
         "- Research Question: what problem the paper tries to solve\n"
         "- Methodology: how the authors studied it (data, methods, experiments)\n"
         "- Key Findings: the main results\n"
         "- Conclusion: what the authors conclude\n"
         "- Limitations: weaknesses or future work the authors mention\n\n"
         "Use simple language a first-year university student can follow.\n\n"
         "PAPER:\n{text}\n\n"
         "PAPER SUMMARY:"),
    ]),
}

# ------------------------------------------------------------
# 4. One chain per document type
# ------------------------------------------------------------
# Each chain is: its own prompt -> the same model -> plain string.
chains = {
    doc_type: template | llm | StrOutputParser()
    for doc_type, template in PROMPT_TEMPLATES.items()
}


# ------------------------------------------------------------
# 5. Helper function: read the text out of a PDF
# ------------------------------------------------------------
def read_pdf_file(file_contents: BytesIO) -> str:
    """Return all the text in a PDF, joined page by page."""
    try:
        pdf_reader = PdfReader(file_contents)
        return "\n".join(page.extract_text() or "" for page in pdf_reader.pages)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {e}")


# ------------------------------------------------------------
# 6. The API endpoints
# ------------------------------------------------------------
# The styled web page lives in summarizer.html, next to this file.
HTML_PAGE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "summarizer.html")


@app.get("/", include_in_schema=False)
def home():
    """Show the summarizer web page."""
    return FileResponse(HTML_PAGE)


@app.get("/document-types")
def list_document_types():
    """Show which document types you can choose."""
    return {"document_types": [doc_type.value for doc_type in DocumentType]}


@app.post("/summarize")
async def summarize_pdf(
    file: UploadFile = File(...),
    # Form(...) means the type is sent together with the uploaded file.
    # If you don't choose one, "general" is used.
    document_type: DocumentType = Form(DocumentType.general),
):
    # Step 1: make sure the upload is a PDF file.
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Step 2: read the uploaded file and pull out its text.
    contents = await file.read()
    text = read_pdf_file(BytesIO(contents))

    # Step 3: stop if the PDF has no text (for example, scanned images only).
    if not text.strip():
        raise HTTPException(status_code=400, detail="No readable text found.")

    # Step 4: pick the chain for the chosen type and ask Gemini for the summary.
    chain = chains[document_type]
    try:
        summary = await chain.ainvoke({"text": text})
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="An error occurred while summarizing the document.")

    # Step 5: send the summary back, along with the type that was used.
    return {"document_type": document_type.value, "summary": summary}
