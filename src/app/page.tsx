"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Shorten URL
          </button>
        </form>
        {shortUrl && (
          <div className="mt-4">
            <p>Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
