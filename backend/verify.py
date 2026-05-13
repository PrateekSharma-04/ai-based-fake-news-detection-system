from pathlib import Path

import joblib

BASE_DIR = Path(__file__).resolve().parent

model = joblib.load(BASE_DIR / "model.pkl")
vectorizer = joblib.load(BASE_DIR / "vectorizer.pkl")


def get_explanation(label: str) -> str:
    if label == "REAL":
        return (
            "The content follows a structured and factual news-writing style, "
            "so the model classified it as REAL."
        )

    return (
        "The content contains sensational or misleading patterns commonly "
        "associated with fake news."
    )


def analyze_text_news(text: str) -> dict[str, str]:
    transformed_text = vectorizer.transform([text])
    prediction = model.predict(transformed_text)[0]
    probabilities = model.predict_proba(transformed_text)[0]
    confidence = round(max(probabilities) * 100, 2)

    if prediction == 0:
        label = "FAKE"
    else:
        label = "REAL"

    return {
        "prediction": label,
        "confidence": f"{confidence}%",
        "explanation": get_explanation(label),
    }
