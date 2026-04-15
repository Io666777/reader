import type { Context } from "hono";
import prisma from "../../../lib/prisma";

export const getBookById = async(c: Context)=>{
const id = c.req.param('id');
try{
    const book = await prisma.book.findUnique({
        where:{id:id},
        include: {author: true}
    });
    if(book){
        return c.json(book);
    }
    const response = await fetch(`https://openlibrary.org/works/${id}.json`)
    if(response.ok){
        const externalData = await response.json()
        return c.json({
            bookName: externalData.title
        })
    }
    return c.json({error: 'not found'},404)
}catch(error){
    return c.json({error: 'server error'},500)
}
}