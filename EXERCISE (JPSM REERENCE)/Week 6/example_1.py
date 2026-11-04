# import os
# from dotenv import load_dotenv
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.output_parsers import StrOutputParser


# app = FastAPI() 

# load_dotenv()
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# if not GEMINI_API_KEY:
#     raise RuntimeError("GEMINI_API_KEY is not set. Add it to your .env file.")

# app = FastAPI(title="Text Translator API")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

# prompt = ChatPromptTemplate.from_messages(
#     [
#         (
#             "system",
#             "You are a helpful assistant that translates {input_language} to {output_language}. "
#             "Reply with the translated text only.",
#         ),
#         ("human", "{input}"),
#     ]
# )

# chain = prompt | llm | StrOutputParser()


# class TranslationRequest(BaseModel):
#     input_language: str
#     output_language: str
#     text_input: str


# class TranslationResponse(BaseModel):
#     translated_text: str


# @app.post("/translate", response_model=TranslationResponse)
# def translate_text(request: TranslationRequest):
#     try:
#         result = chain.invoke(
#             {
#                 "input_language": request.input_language,
#                 "output_language": request.output_language,
#                 "input": request.text_input,
#             }
#         )
#         return TranslationResponse(translated_text=result)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Translation error: {e}")


# @app.get("/")
# def root():
#     return {"message": "Text Translator API is running"}



load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

messages = [
    (
        "system",
        "You are a helpful assistant that translates English to German. Translate the provided sentence only."
    ),
    (
        "human",
        "I Like programming"
    ),
]

chain = llm | StrOutputParser()
ai_msg = chain.invoke(messages)
print(ai_msg)

Prompt Template

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant that translates {input_language} to {output_language}."
        ),
        (
            "human",
            "{input}"
        )
    ]
)

chain = prompt | llm | StrOutputParser()

ai_msg = chain.invoke({
    "input_language": "English",
    "output_language" : "Mandarin",
    "input": "Hi Sharon, have a nice day"
})

print(ai_msg)