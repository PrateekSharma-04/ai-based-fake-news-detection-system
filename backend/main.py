from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from verify import analyze_text_news

app = FastAPI(title="AI Fake News Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)


class NewsRequest(BaseModel):
    text: str


@app.post("/analyze")
def analyze_news(request: NewsRequest):
    return analyze_text_news(request.text)
