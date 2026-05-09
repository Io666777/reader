import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook } from "../../utils/formatters";

export const getAll = async (c: Context) => {
  // Важно: берем jwtPayload, который мы установим в middleware
  const payload = c.get('jwtPayload');
  
  if (!payload || !payload.id) {
    return c.json({ error: 'Пользователь не авторизован' }, 401);
  }

  const userId = payload.id;
  const query = c.req.query('q');
  const genre = c.req.query('genre');
  const year = c.req.query('year');

  const where: any = {
    // Главное условие: только книги, связанные с этим пользователем
    userBooks: {
      some: { userId: userId }
    }
  };

  if (query) {
    where.OR = [
      { bookName: { contains: query, mode: 'insensitive' } },
      { author: { name: { contains: query, mode: 'insensitive' } } }
    ];
  }

  if (genre) {
    where.genres = {
      some: { name: { equals: genre, mode: 'insensitive' } }
    };
  }

  if (year) {
    where.realiseYear = year;
  }

  try {
    const books = await prisma.book.findMany({
      where,
      include: { author: true, genres: true }
    });
    return c.json(books.map(formatBook));
  } catch (error: any) {
    return c.json({ error: 'Ошибка при получении списка книг' }, 500);
  }
};