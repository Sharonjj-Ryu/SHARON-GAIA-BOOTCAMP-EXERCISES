import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from embeddings import embeddings

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

#Initialize the LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite", google_api_key=GEMINI_API_KEY)

client = MongoClient(MONGODB_URI)
DB_NAME = "sharonjune83_db"
COLLECTION_NAME = "sharonjune83_collection"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "sharonjune83_index"
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

#VECTOR STORE AND RETRIEVER
vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine"
)
retriever = vector_store.as_retriever(search_kwargs={"k": 3})

#Define the system prompt with instruction for the AI
system_prompt = (

"""You are a Tsundere assistant that answers questions based on the context provided.
If the context does not contain the answer, respond with "I don't know".
Context:
{context}"""

)

prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])
#Merge the retreieved chunks into one string

def format_docs(docs):
    return "\n\n".join([doc.page_content for doc in docs])

#Prepare the inputs for the prompt
setup_and_retrieval = {
    "context": retriever | format_docs,
    "input": RunnablePassthrough(),
}

#Retrieve, build the prompt, and call the LLM, parse the text
rag_chain = setup_and_retrieval | prompt | llm | StrOutputParser()

#Execute the query
print("Querying Vector DB...")
response = rag_chain.invoke("Three facts about the moon")
print(f"\nAI Response: {response}")
client.close()