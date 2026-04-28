import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook } from "../../utils/formatters";

export const getAll = async (c: Context) => {
  const query = c.req.query('q');
  const genre = c.req.query('genre');
  const year = c.req.query('year');

  // Создаем базовый объект условий
  const where: any = {};

  // 1. Условие поиска (если есть)
  if (query) {
    where.OR = [
      { bookName: { contains: query, mode: 'insensitive' } },
      { author: { name: { contains: query, mode: 'insensitive' } } }
    ];
  }

  // 2. Условие жанра (если есть)
  // Добавляется К поиску, а не ВМЕСТО него
  if (genre) {
    where.genres = {
      some: { name: { equals: genre, mode: 'insensitive' } }
    };
  }

  // 3. Условие года
  if (year) {
    where.realiseYear = year;
  }

  const books = await prisma.book.findMany({
    where, // Здесь будут лежать все собранные выше условия
    include: { author: true, genres: true }
  });

  return c.json(books.map(formatBook));
};