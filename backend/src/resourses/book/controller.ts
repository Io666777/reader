import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const getBooks = async (c: Context) => {
    const isbn = c.req.query('isbn');

    if (!isbn) {
        return c.json({ error: 'ISBN is required' }, 400);
    }

    try {
        const existingBook = await prisma.book.findUnique({
            where: { isbn: isbn }
        });

        if (existingBook) {
        
            return c.json({ 
                message: 'Book already exists', 
                book: existingBook 
            });
        }
        const apiUrl = process.env.API_URL
        const response = await fetch(`${process.env.API_URL}?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
        const data = await response.json();

        const bookData = data[`ISBN:${isbn}`];

        if (!bookData) return c.json({ error: 'Book not found' }, 404);

        const newBook = await prisma.book.create({
            data: {
                isbn: isbn,
                bookName: bookData.title,
                authorName: bookData.authors[0].name,
                image: bookData.cover.large,
                realiseYear: bookData.publish_date,
            }
        })
        return c.json(newBook);
    } catch (error) {
        return c.json({ error: 'Internal server error' }, 500);
    }
}

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