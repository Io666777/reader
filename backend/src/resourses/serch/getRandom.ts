import { topics } from "../../utils/keyWord";
import type { Context } from "hono";

export const getRandom = async (c: Context): Promise<any> => {
  const randomWord = topics[Math.floor(Math.random() * topics.length)];
  const randomStart = Math.floor(Math.random() * 40);

  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(randomWord)}&startIndex=${randomStart}&maxResults=1`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    console.log("Пусто, ищу заново...");
    return getRandom(c); 
  }

  return c.json({
    book: data.items[0],
    word: randomWord
  });
};