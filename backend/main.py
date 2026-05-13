from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from verify import analyze_text_news

app = FastAPI(title="AI Fake News Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins="https://ai-based-fake-news-detection-system-zeta.vercel.app/",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NewsRequest(BaseModel):
    text: str


@app.post("/analyze")
def analyze_news(request: NewsRequest):
    return analyze_text_news(request.text)
