import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const getAvailableFilters = async (c: Context) => {
  console.log("Запрос дошел до getAvailableFilters!"); // Появится ли это в консоли терминала?
  try {
    const genres = await prisma.genre.findMany({
      select: {
        name: true,
        // Добавляем подсчет книг для каждого жанра
        _count: {
          select: { books: true } 
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    const books = await prisma.book.findMany({
      select: {
        realiseYear: true
      },
      distinct: ['realiseYear'],
      orderBy: {
        realiseYear: 'desc'
      }
    });

    return c.json({
      // Теперь возвращаем объекты с именем и количеством
      genres: genres.map(g => ({
        name: g.name,
        count: g._count.books
      })),
      years: books.map(b => b.realiseYear).filter(Boolean)
    });
  } catch (error) {
    return c.json({ error: "не удалось загрузить фильтры" }, 500);
  }
}