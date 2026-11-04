import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_core.documents import Document
from langchain_text_splitters import CharacterTextSplitter, RecursiveCharacterTextSplitter
from langchain_mongodb import MongoDBAtlasVectorSearch
from embeddings import embeddings

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

client = MongoClient(MONGODB_URI)
DB_NAME = "sharonjune83_db"
COLLECTION_NAME = "sharonjune83_collection"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "sharonjune83_index"   
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine"
)
#Start Clean: re-embed everything in the collection
MONGODB_COLLECTION.delete_many({})
print("Previous documents cleared")

#set up the text splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100,
)

#Custom PDF loader: one document per page
def load_pdf