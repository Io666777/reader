import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook, prepareBookInput } from "../../utils/formatters";

export const addBook = async (c: Context) => {
  const payload = c.get('jwtPayload');
  
  if (!payload || !payload.id) {
    return c.json({ error: 'Доступ запрещен' }, 401);
  }

  const userId = payload.id;

  try {
    const body = await c.req.json();
    const input = prepareBookInput(body);

    if (!input.id) {
      return c.json({ success: false, error: "ID книги обязателен" }, 400);
    }

    const book = await prisma.book.upsert({
      where: { id: input.id },
      update: {
        bookName: input.title,
        image: input.image, // ДОБАВИТЬ ЭТО
        realiseYear: input.realiseYear, // ДОБАВИТЬ ЭТО
        description: input.description,
        userBooks: {
          connectOrCreate: {
            where: { userId_bookId: { userId, bookId: input.id } },
            create: { userId: userId }
          }
        }
      }, 
      create: {
        id: input.id,
        bookName: input.title,
        image: input.image, // ДОБАВИТЬ ЭТО
        realiseYear: input.realiseYear, // ДОБАВИТЬ ЭТО
        description: input.description,
        userBooks: {
          create: { userId: userId }
        },
        author: {
          connectOrCreate: {
            where: { name: input.authorName },
            create: { name: input.authorName }
          }
        },
        genres: {
          connectOrCreate: input.genresList.map((name: any) => ({
            where: { name },
            create: { name }
          }))
        }
      },
      include: { author: true, genres: true }
    });

    return c.json({ success: true, data: formatBook(book) }, 201);
  } catch (error: any) {
    return c.json({ success: false, error: 'Ошибка сервера при добавлении' }, 500);
  }
};