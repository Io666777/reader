import type { Context } from "hono";
import prisma from "../../../lib/prisma";

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
        author: true // Важно! Чтобы на фронте отобразилось имя автора
      }
    });

    return c.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return c.json({ error: 'Не удалось получить список книг' }, 500);
  }
};