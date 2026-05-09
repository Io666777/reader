import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook, formatExternalBook } from "../../utils/formatters";

export const getBookById = async (c: Context) => {
  const id = c.req.param('id');
  const payload = c.get('jwtPayload'); 
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!id) {
    return c.json({ error: 'ID книги не указан' }, 400);
  }
  try {
    const book = await prisma.book.findFirst({
      where: { 
        id: id,
        userBooks: {
          some: {
            userId: payload?.id 
          }
        }
      },
      include: { author: true, genres: true }
    });

    if (book) {
      return c.json(formatBook(book));
    }

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
    );

    if (!response.ok) {
      return c.json({ error: 'Книга не найдена' }, 404);
    }

    const externalData = await response.json();

    return c.json(formatExternalBook(externalData));

  } catch (error: any) {
    console.error('Ошибка при получении книги:', error.message);
    return c.json({ error: 'Внутренняя ошибка сервера' }, 500);
  }
};