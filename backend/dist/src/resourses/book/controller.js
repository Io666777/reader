import prisma from "../../lib/prisma.js";
export const getBooks = async (c) => {
    const isbn = c.req.query('isbn');
    try {
        const response = await fetch(`${process.env.API_URL}?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const data = await response.json();
        const bookData = data[`ISBN:${isbn}`];
        if (!bookData)
            return c.json({ error: 'Book not found' }, 404);
        const newBook = await prisma.book.create({
            data: {
                bookName: bookData.title,
                authorName: bookData.authors[0].name,
                image: bookData.cover.large,
                realiseYear: bookData.publish_date,
            }
        });
        return c.json(newBook);
    }
    catch (error) {
        return c.json({ error: 'Internal server error' }, 500);
    }
};
