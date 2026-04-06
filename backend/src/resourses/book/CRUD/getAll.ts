import type { Context } from "hono";
import prisma from "../../../lib/prisma";

export const getAll = async (c: Context) => {
  try {
    const books = await prisma.book.findMany(); 
    return c.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return c.json({ error: 'Не удалось получить список книг' }, 500);
  }
};