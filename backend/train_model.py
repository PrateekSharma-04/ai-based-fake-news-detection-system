import re
from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

BASE_DIR = Path(__file__).resolve().parent


def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    return text


fake = pd.read_csv(BASE_DIR / "Fake.csv")
true = pd.read_csv(BASE_DIR / "True.csv")

fake["label"] = 0
true["label"] = 1

data = pd.concat([fake, true])
data = data.sample(frac=1, random_state=42)
data["text"] = data["text"].apply(clean_text)

X = data["text"]
y = data["label"]

vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)
X_vectorized = vectorizer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42,
)

model = LogisticRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print("Model Accuracy:", accuracy)

joblib.dump(model, BASE_DIR / "model.pkl")
joblib.dump(vectorizer, BASE_DIR / "vectorizer.pkl")
print("Model and vectorizer saved successfully.")
