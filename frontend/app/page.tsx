"use client";

import { FormEvent, useState } from "react";

type AnalysisResult = {
  prediction: string;
  confidence: string;
  explanation: string;
};

const API_URL =  "http://127.0.0.1:8000";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) {
      setError("Please enter some news text to analyze.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("The backend returned an error.");
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch {
      setError("Could not connect to the backend. Please make sure FastAPI is running.");
  } finally {
      setLoading(false);
    }
  }

  const confidenceValue = result ? Number.parseFloat(result.confidence) || 0 : 0;
  const isReal = result?.prediction === "REAL";

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col justify-center">
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-normal sm:text-4xl">
            AI Fake News Detection System
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Paste a news article or claim. The model will classify it using a trained TF-IDF and
            Logistic Regression pipeline.
          </p>
        </div>

        <form onSubmit={analyzeNews} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <label htmlFor="news-text" className="mb-3 block text-sm font-medium text-slate-700">
            News text
          </label>
          <textarea
            id="news-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste the news content here..."
            spellCheck={false}
            className="h-56 w-full resize-none rounded-md border border-slate-300 bg-white p-4 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
          />

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Analyzing text..." : "Analyze News"}
          </button>
        </form>

        {result && (
          <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">Analysis Result</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Prediction</p>
                <p className={`mt-1 text-2xl font-bold ${isReal ? "text-green-700" : "text-red-700"}`}>
                  {result.prediction}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Confidence</p>
                <p className="mt-1 text-2xl font-bold">{result.confidence}</p>
                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div
                    className={`h-2 rounded-full ${isReal ? "bg-green-600" : "bg-red-600"}`}
                    style={{ width: `${Math.min(confidenceValue, 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">{result.explanation}</p>
          </section>
        )}
      </section>
    </main>
  );
}
