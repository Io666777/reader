import type { Context } from "hono";
import prisma from "../../lib/prisma"; // Используй свой готовый инстанс prisma
import { formatBook, formatExternalBook } from "../../utils/formatters";

export const getBookById = async (c: Context) => {
  const id = c.req.param('id');
   
  try {
 
    const book = await prisma.book.findUnique({
      where: { id: id },
      include: { author: true, genres: true }
    });

    if (book) {
      return c.json(formatBook(book)) ;
    }

    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!response.ok) return c.json({ error: 'Книга не найдена' }, 404);

        const externalData = await response.json();

        // --- ЛОГИКА ПОЛУЧЕНИЯ ИМЕНИ АВТОРА ---
        let authorName = "Неизвестный автор";

        if (externalData.authors && externalData.authors.length > 0) {
          const authorKey = externalData.authors[0].author.key; // Например, /authors/OL123A

          // Делаем второй запрос за именем
          const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
          if (authorRes.ok) {
            const authorData = await authorRes.json();
            authorName = authorData.name; // Вот теперь у нас есть реальное имя!
          }
      }


 
    return c.json(formatExternalBook(id!, externalData, authorName));

  } catch (error) {
    console.error(error);  
    return c.json({ error: 'server error' }, 500);
  }
};