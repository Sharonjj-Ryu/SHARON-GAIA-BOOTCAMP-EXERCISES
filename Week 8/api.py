import os
from urllib.parse import urlparse

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from google import genai
from google.genai import types
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="YouTube Video Analyzer")


class VideoRequest(BaseModel):
    youtube_url: str


@app.post("/analyze")
def analyze_video(request: VideoRequest) -> dict[str, str | None]:
    parsed_url = urlparse(request.youtube_url)
    if parsed_url.scheme != "https" or parsed_url.hostname not in {
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtu.be",
        "www.youtu.be",
    }:
        raise HTTPException(
            status_code=422,
            detail="Enter an HTTPS URL from youtube.com or youtu.be.",
        )

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY was not found in the .env file.",
        )

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=[
            types.Part(
                file_data=types.FileData(
                    file_uri=request.youtube_url,
                    mime_type="video/mp4",
                )
            ),
            types.Part(text="Describe what's happening in this video."),
        ],
    )

    return {"analysis": response.text}
