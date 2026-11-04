import os 
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model ="gemini-3.5-flash-lite",
    google_api_key=os.getenv("GEMINI_API-KEY"),
)

llm_with_url = llm.bind_tools([{"url_context": {}}])
URL = "https://blog.google/technology/ai/google-gemini-ai"

chain = llm_with_url | StrOutputParser()

response = chain.invoke([
    HumanMessage(content=f"Write a concise summary of this page: {URL}")
])

print(response)
