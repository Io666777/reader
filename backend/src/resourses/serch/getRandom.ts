import { topics } from "../../utils/keyWord";
import type { Context } from "hono";

export const getRandom = async (c: Context) => {
  try {
   if (!topics || topics.length === 0) {
      throw new Error("Массив тем пуст или не найден");
    }
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomStart = Math.floor(Math.random() * 200);

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(randomTopic)}&startIndex=${randomStart}&maxResults=1`;

    const response = await fetch(url);
    const data = await response.json();
    return c.json({
      book: data.items?.[0] || null,
      metadata: { topic: randomTopic, index: randomStart, status: 'fallback_to_start' }
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
};