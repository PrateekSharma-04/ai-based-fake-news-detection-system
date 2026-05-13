# AI Fake News Detection System

This is a simple internship-level project for detecting fake news from text.

The frontend is built with Next.js. The backend is built with FastAPI and uses a trained machine learning model. The model uses TF-IDF for text features and Logistic Regression for classification.

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- FastAPI
- Python
- scikit-learn
- pandas

## Folder Structure

```text
backend/
  main.py
  verify.py
  train_model.py
  model.pkl
  vectorizer.pkl
  Fake.csv
  True.csv

frontend/
  app/
    page.tsx
    layout.tsx
    globals.css
  package.json
```

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
uvicorn main:app --reload
```

The backend runs on:

```text
http://127.0.0.1:8000
```

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

## How It Works

1. Enter or paste news text in the frontend.
2. The frontend sends the text to the FastAPI backend.
3. The backend transforms the text using the saved TF-IDF vectorizer.
4. The Logistic Regression model predicts whether the text is REAL or FAKE.
5. The frontend displays the prediction, confidence score, and a short explanation.

## API

```text
POST /analyze
```

Example request:

```json
{
  "text": "The government released an official statement about the new policy."
}
```

Example response:

```json
{
  "prediction": "REAL",
  "confidence": "91.34%",
  "explanation": "The content follows a structured and factual news-writing style, so the model classified it as REAL."
}
```
