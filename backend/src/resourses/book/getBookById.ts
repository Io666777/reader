import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook, formatExternalBook } from "../../utils/formatters";

export const getBookById = async (c: Context) => {
  const id = c.req.param('id');
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY; // Наш новый ключ из .env

  try {
    // 1. Сначала ищем в своей БД
    const book = await prisma.book.findUnique({
      where: { id: id },
      include: { author: true, genres: true }
    });

    if (book) {
      return c.json(formatBook(book));
    }

    // 2. Если в базе нет, идем в Google Books
    // URL для получения ОДНОЙ книги по ID
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
    );

    if (!response.ok) {
      return c.json({ error: 'Книга не найдена во внешнем источнике' }, 404);
    }

    const externalData = await response.json();

    // 3. Извлекаем данные (у Google всё лежит в объекте volumeInfo)
    const info = externalData.volumeInfo;
    
    // Автор сразу здесь, массив строк. Берем первого или джойним.
    const authorName = info.authors ? info.authors.join(", ") : "Неизвестный автор";

    // 4. Возвращаем результат
    // Важно: проверь, чтобы formatExternalBook принимал данные от Google
    return c.json(formatExternalBook(id!, externalData, authorName));

  } catch (error: any) {
    console.error('Ошибка при получении книги:', error.message);
    return c.json({ error: 'Внутренняя ошибка сервера' }, 500);
  }
};