import type { Context } from "hono";
import { formatExternalBook } from "../../../utils/formatters"; // Импортируем

export const searchExternal = async (c: Context) => {
  const title = c.req.query('title');
  const author = c.req.query('author');
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!title && !author) {
    return c.json({ error: 'Нужен хотя бы один параметр' }, 400);
  }

  try {
    let queryParts = [];
    if (title) queryParts.push(`intitle:${title}`);
    if (author) queryParts.push(`inauthor:${author}`);
    
    const q = encodeURIComponent(queryParts.join('+'));
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=10&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // ВОТ ТУТ МАГИЯ: просто вызываем наш форматтер для каждого элемента
    const results = (data.items || []).map(formatExternalBook);

    return c.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return c.json({ error: 'Ошибка внешнего поиска' }, 500);
  }
};