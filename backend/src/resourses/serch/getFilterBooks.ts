import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const getFilterBooks = async(c:Context)=>{
    const genre = c.req.query('genre')
    const year = c.req.query('year')

    const where: any={}

    if(genre){
        where.genres={
            some:{name:genre}
        }
    }

    if(year){
        where.realiseYear=year
    }

    try{
        
        const books =await prisma.book.findMany({
            where,
            include:{
                author: true,
                genres: true
            }
        })

    const mappedBooks = books.map(book=>({
      id: book.id,
      bookName: book.bookName,
      author: book.author.name,
      image: book.image,
      realiseYear: book.realiseYear,
      rating: book.rating,
      genre: book.genres.map(g=>g.name),
      isbn: book.isbn
    }))
    return c.json(mappedBooks);
    }catch (error) {
    return c.json({ error: "Ошибка при фильтрации" }, 500);
  }
};