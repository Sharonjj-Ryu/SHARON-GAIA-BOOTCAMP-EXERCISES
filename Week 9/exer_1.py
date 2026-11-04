import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from embeddings import embeddings

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

#connect to MongoDB Atlas
client = MongoClient(MONGODB_URI)

#define the database and collection names
DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf" 
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]
# INITIALIZE THE VECTOR SEARCH
vector_store = MongoDBAtlasVectorSearch(
    collection = MONGODB_COLLECTION,
    embedding = embeddings,
    index_name = ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn = "cosine",
    )
#create the vector search index
print("Creating vector search index... ")
vector_store.create_vector_search_index(
dimensions=768, wait_until_complete=60
)
print("Vector Store Created!")

client.close()