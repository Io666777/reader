import type { Context } from "hono";
import prisma from "../../lib/prisma";

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

    const mappedBooks = books.map(book=>({
      id: book.id,
      bookName: book.bookName,
      author: book.author.name,
      image: book.image,
      realiseYear: book.realiseYear,
      rating: book.rating,
      genres: book.genres.map(g=>g.name),
      isbn: book.isbn
    }))
    return c.json(mappedBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    return c.json({ error: 'Не удалось получить список книг' }, 500);
  }
};