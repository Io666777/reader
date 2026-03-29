import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const getAll = async (c: Context) => {
  try {
    const books = await prisma.book.findMany(); 
    return c.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return c.json({ error: 'Не удалось получить список книг' }, 500);
  }
};

export const addBook = async (c: Context) => {
  try {
    // Получаем данные книги из тела запроса (с фронтенда)
    const body = await c.req.json();

    const newBook = await prisma.book.create({
      data: {
        isbn: body.isbn,
        bookName: body.title,
        authorName: body.author,
        image: body.cover,
        realiseYear: String(body.year),
      }
    });

    return c.json(newBook, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Could not save book' }, 500);
  }
};

export const deleteBook = async(c:Context)=>{
    const id = c.req.param('id');
    try{
        await prisma.book.delete({
            where:{id:id}
        });

        return c.json({message: 'book deleted'}, 200);
    }catch(error){
        return c.json({error: 'book not deleted'},404)
    }
}