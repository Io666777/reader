import type { Context } from "hono";
import prisma from "../../lib/prisma"; // Используй свой готовый инстанс prisma

export const getBookById = async (c: Context) => {
  const id = c.req.param('id');
   
  try {
 
    const book = await prisma.book.findUnique({
      where: { id: id },
      include: { author: true, genres: true }
    });

    if (book) {
      return c.json({
        id: book.id,
        title: book.bookName,
        description: book.description,
        image: book.image,
        reliseYear: book.realiseYear ? Number(book.realiseYear) : 0,
        rating: book.rating,
        genres: book.genres.map(g=> g.name),
        isExternal: false
        
      });
    }
     const response = await fetch(`https://openlibrary.org/books/${id}.json`)
 
    if (!response.ok) {
      return c.json({ error: 'Книга не найдена ни в базе, ни в Open Library' }, 404);
    }

    const externalData = await response.json();

    const mappedBook = {
      id: id,
      title: externalData.title,
      description: typeof externalData.description === 'string'
        ? externalData.description
        : externalData.description?.value || "Описание отсутствует",
      image: externalData.covers
        ? `https://covers.openlibrary.org/b/id/${externalData.covers[0]}-L.jpg`
        : null,
      realiseYear: externalData.first_publish_year || "-", 
      rating: externalData.ratings_average || 0,
      genres: externalData.subjects || externalData.subject || [],
      isExternal: true
    };
 
    return c.json(mappedBook);

  } catch (error) {
    console.error(error);  
    return c.json({ error: 'server error' }, 500);
  }
};