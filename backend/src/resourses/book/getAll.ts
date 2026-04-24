import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook } from "../../utils/formatters";

export const getAll = async (c: Context) => {
  try {
    // 1. Извлекаем поисковый запрос (тот самый 'q')
    const query = c.req.query('q');

    // 2. Если запрос есть — фильтруем, если нет — отдаем всё
    const books = await prisma.book.findMany({
      where: query ? {
        OR: [
          { bookName: { contains: query, mode: 'insensitive' } },
          { author: { name: { contains: query, mode: 'insensitive' } } }
        ]
      } : {},
      include: {
        author: true,
        genres: true
      }
    });

    
    return c.json(books.map(formatBook));
  } catch (error) {
    console.error('Error fetching books:', error);
    return c.json({ error: 'Не удалось получить список книг' }, 500);
  }
};