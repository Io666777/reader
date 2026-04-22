import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const addBook = async (c: Context) => {
  try {
    const body = await c.req.json();
    
    // 1. Извлекаем данные с дефолтными значениями сразу
    const id = body.id;
    const title = body.title || "Без названия";
    const authorName = body.author || "Неизвестный автор";
    const image = body.image || null;
    const description = body.description || "";
    const realiseYear = String(body.reliseYear || "");
    const genresList = Array.isArray(body.genres) ? body.genres : [];

    if (!id) {
      return c.json({ success: false, error: "ID книги обязателен" }, 400);
    }

    // 2. Выполняем операцию
    const book = await prisma.book.upsert({
      where: { id: id },
      update: {
        bookName: title,
        image: image,
        description: description,
        realiseYear: realiseYear,
      }, 
      create: {
        id: id,
        bookName: title,
        image: image,
        description: description,
        realiseYear: realiseYear,
        // Обязательная связь с автором 
        author: {
          connectOrCreate: {
            where: { name: authorName },
            create: { name: authorName }
          }
        },
        // Связь с жанрами
        genres: {
          connectOrCreate: genresList.map((g: string) => ({
            where: { name: g },
            create: { name: g }
          }))
        }
      },
      include: { 
        author: true,
        genres: true 
      }
    });

    return c.json({ success: true, data: book }, 201);
  } catch (error: any) {
    console.error('Ошибка Prisma:', error.message);
    // Выводим конкретное поле, вызвавшее ошибку, если оно есть в meta
    if (error.meta) console.error('Детали ошибки:', error.meta);
    
    return c.json({ 
      success: false, 
      error: 'Ошибка базы данных', 
      details: error.message 
    }, 500);
  }
};