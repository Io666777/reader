import type { Context } from "hono";
import prisma from "../../../lib/prisma";

export const addBook = async (c: Context) => {
  try {
    const body = await c.req.json();

    const newBook = await prisma.book.create({
      data: {
        isbn: body.isbn,
        bookName: body.title,
        image: body.cover,
        realiseYear: String(body.year),
        author: {
          connectOrCreate: {
            where: { name: body.author }, 
            create: { name: body.author }
          }
        }
      },
      include: {
        author: true 
      }
    });

    return c.json(newBook, 201);
  } catch (error) {
    console.error('Prisma Error:', error);
    return c.json({ error: 'Ошибка сохранения: возможно, такой ISBN уже есть' }, 500);
  }
};

export function getAll(arg0: string, getAll: any) {
    throw new Error("Function not implemented.");
}
