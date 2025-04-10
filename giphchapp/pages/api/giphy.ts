import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const key = process.env.GIPHY_API_KEY;
    const search = req.query.search;
    if (!search) return res.status(400).json({ error: "No search" });
  
    const r = await fetch(`https://api.giphy.com/v1/gifs/search?q=${search}&limit=1&api_key=${key}`);
    const d = await r.json();
    res.json(d);
}