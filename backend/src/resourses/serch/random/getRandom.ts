import { topics } from "../../../utils/keyWord";
import type { Context } from "hono";

export const getRandom = async (c: Context): Promise<any> => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  let attempts = 0;
  const maxAttempts = 5; 

  while (attempts < maxAttempts) {
    attempts++;
    const randomWord = topics[Math.floor(Math.random() * topics.length)];
    const randomStart = Math.floor(Math.random() * 10);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(randomWord)}&startIndex=${randomStart}&maxResults=1&printType=books${apiKey ? `&key=${apiKey}` : ''}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        return c.json({
          book: data.items[0],
          word: randomWord
        });
      }
    } catch (error) {
      console.error("Ошибка при запросе к Google Books:", error);
    }
    console.log(`Попытка ${attempts}: для слова "${randomWord}" ничего не найдено, ищу дальше...`);
  }
  return c.json({ error: "Не удалось найти случайную книгу. Попробуйте еще раз." }, 404);
};