import type { Context } from "hono";
import prisma from "../../lib/prisma";
import { formatBook } from "../../utils/formatters";

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

    return c.json(books.map(formatBook));
    
    }catch (error) {
    return c.json({ error: "Ошибка при фильтрации" }, 500);
  }
};