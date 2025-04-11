"use client";

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGif = async () => {
    //check if there is a search term
    if (!searchTerm) return;
    //Set loading to true and set previous errors to empty 
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/giphy?search=${encodeURIComponent(searchTerm)}`);
      //Giphy API sents data as JSON text, I converted it into JavaScript object
      const data = await res.json();

      if (Array.isArray(data?.data) && data.data.length > 0) {
        //a way to access JS object (data.data[0].images.original.url)
        const firstGif = data.data[0];
        setGifUrl(firstGif.images.original.url);
        setOriginalUrl(firstGif.url);
      } else {
        setGifUrl(null);
        setOriginalUrl(null);
        setError("No GIFs found. Try searching again.");
      }
    } catch (err) {
      console.error("Error fetching GIF:", err);
      setError("Failed to fetch GIFs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-100 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-6">Giphch</h1>
      <div className="w-full max-w-md flex gap-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type something..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded"/>
        <button
          onClick={fetchGif}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {gifUrl && originalUrl && (
        <Card className="w-[300px] shadow-md hover:scale-105 transition-transform">
          <CardContent className="p-4 flex justify-center items-center">
            <a href={originalUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={gifUrl}
                alt="GIF Result"
                className="rounded hover:opacity-90"/>
            </a>
          </CardContent>
        </Card>
      )}
    </main>
  );
}