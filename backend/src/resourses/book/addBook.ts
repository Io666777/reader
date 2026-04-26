import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook, prepareBookInput } from "../../utils/formatters";

export const addBook = async (c: Context) => {
  try {
    const body = await c.req.json();
    
    // 1. Извлекаем данные
    const input = prepareBookInput(body);

    if (!input.id) {
      return c.json({ success: false, error: "ID книги обязателен" }, 400);
    }

    const book = await prisma.book.upsert({
      where: { id: input.id },
      update: {
        bookName: input.title,
        image: input.image,
        description: input.description,
        realiseYear: input.realiseYear,
        author: {
          connectOrCreate: {
            where: { name: input.authorName },
            create: { name: input.authorName }
          }
        }
      }, 
      create: {
        id: input.id,
        bookName: input.title,
        image: input.image,
        description: input.description,
        realiseYear: input.realiseYear,
        author: {
          connectOrCreate: {
            where: { name: input.authorName },
            create: { name: input.authorName }
          }
        },
        genres: {
          connectOrCreate: input.genresList.map((name) => ({
            where: { name },
            create: { name }
          }))
        }
      },
      include: { author: true, genres: true }
    });

    return c.json({ success: true, data: formatBook(book) }, 201);

  } catch (error: any) {
    console.error('Ошибка Prisma:', error.message);
    if (error.meta) console.error('Детали ошибки:', error.meta);
    
    return c.json({ 
      success: false, 
      error: 'Ошибка при сохранении в базу данных', 
      details: error.message 
    }, 500);
  }
};