import type { Context } from "hono";
import prisma from "../../../lib/prisma";


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