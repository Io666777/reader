import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const getAvailableFilters = async (c: Context)=>{
    try{
        const genres = await prisma.genre.findMany({
            select:{
                name:   true,
            },
            orderBy:{
                name: 'asc'
            }
        })

        const books = await prisma.book.findMany({
            select:{
                realiseYear: true
            },
            distinct: ['realiseYear'],
            orderBy:{
                realiseYear:'desc'
            }
        })
        
        return c.json({
            genres: genres.map(g=> g.name),
            years: books.map(b=>b.realiseYear).filter(Boolean)
        })
    }catch(error){
        return c.json({error: "не удалось загрузить фильтры"},500)
    }
}