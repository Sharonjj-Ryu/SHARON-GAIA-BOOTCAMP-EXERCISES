import os
from urllib.parse import urlparse

from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY was not found. Add it to your .env file.")

client = genai.Client(api_key=api_key)

youtube_url = input("Enter the public YouTube video URL: ").strip()
parsed_url = urlparse(youtube_url)
if parsed_url.scheme != "https" or parsed_url.hostname not in {
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "youtu.be",
    "www.youtu.be",
}:
    raise ValueError("Enter a valid HTTPS URL from youtube.com or youtu.be.")

print("Analyzing video...")
response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents=[
        types.Part(
            file_data=types.FileData(
                file_uri=youtube_url,
                mime_type="video/mp4",
            )
        ),
        types.Part(text="Describe what's happening in this video."),
    ],
)

print("Analysis completed!")
print("\nResults:\n")
print(response.text)
