import type { Context } from "hono";
import prisma from "../../../lib/prisma";

export const getGlobalGenres = async (c: Context)=>{
    try{
        const genres = await prisma.genre.findMany({
            select: {
                name: true
            },
            orderBy: {
                name: 'asc'
            }
        })
        return c.json({
            genres: genres.map(g=>g.name)
        })
    }catch(error){
        console.error("Ошибка при получении глобальных жанров:", error);
        return c.json({ error: "Не удалось загрузить список жанров" }, 500);
    }
}