"use client";

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";

export default function Home() {
  const [text, setText] = useState("");
  const [gif, setGif] = useState(null);

  const searchGif = async () => {
    if (!text) return;
    const res = await fetch(`/api/giphy?search=${text}`);
    const data = await res.json();
    const found = data.data[0];
    setGif(found ? found.images.original.url : null);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Giphch</h1>

      <div className="w-full max-w-md flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="border px-2 py-1 rounded w-full"
        />
        <button onClick={searchGif} className="bg-blue-500 text-white px-3 py-1 rounded">
          Search
        </button>
      </div>

      {gif && (
        <Card>
          <CardContent>
            <img src={gif} alt="GIF" className="w-full h-auto" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}