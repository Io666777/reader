import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const deleteBook = async (c: Context) => {
  const bookId = c.req.param('id');
  const payload = c.get('jwtPayload');

  if (!payload || !payload.id || !bookId) {
    return c.json({ error: 'Недостаточно данных для удаления' }, 400);
  }

  try {
    // Удаляем связь, а не саму книгу!
    await prisma.userBook.delete({
      where: {
        userId_bookId: {
          userId: payload.id,
          bookId: bookId
        }
      }
    });

    return c.json({ message: 'Книга убрана с вашей полки' }, 200);
  } catch (error) {
    return c.json({ error: 'Книга не найдена на вашей полке' }, 404);
  }
};