import { topics } from "../../../utils/keyWord";
import type { Context } from "hono";
import { formatExternalBook } from "../../../utils/formatters";

export const getRandomBooks = async (c: Context): Promise<any> => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  
  // Функция для выполнения одного запроса
  const fetchBooks = async () => {
    const randomWord = topics[Math.floor(Math.random() * topics.length)];
    // Уменьшаем startIndex до 0-10, чтобы поиск был точнее и быстрее
    const randomStart = Math.floor(Math.random() * 10); 
    
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(randomWord)}&startIndex=${randomStart}&maxResults=12&printType=books&key=${apiKey}`;
    
    const response = await fetch(url);
    return await response.json();
  };

  let data = await fetchBooks();

  // Если пусто, пробуем еще один раз с другим словом, но без бесконечной рекурсии
  if (!data.items || data.items.length === 0) {
    data = await fetchBooks();
  }

  const formattedBooks = (data.items || []).map((item: any) => formatExternalBook(item));

  return c.json({
    book: formattedBooks
  });
};