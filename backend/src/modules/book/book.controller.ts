import type { Context } from 'hono';
import prisma from '../../lib/prisma';

export const getUserBooks = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id;

    const books = await prisma.book.findMany({
      where: {
        users: {
          some: { id: userId }
        }
      },
      include: {
        folders: true
      }
    });

    return c.json({ success: true, data: books });
  } catch (error) {
    return c.json({ success: false, error: 'Ошибка сервера при получении книг' }, 500);
  }
};

export const createBook = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id;
    const body = await c.req.json();

    if (!body.title) {
      return c.json({ success: false, error: 'Название книги обязательно' }, 400);
    }

    const bookData: any = {
      title: body.title,
      author: body.author || 'Неизвестный автор',
      description: body.description,
      image: body.image,
      users: {
        connect: { id: userId }
      }
    };

    if (body.folderId) {
      bookData.folders = {
        connect: { id: body.folderId }
      };
    }

    const book = await prisma.book.create({
      data: bookData
    });

    return c.json({ success: true, data: book }, 201);
  } catch (error) {
    return c.json({ success: false, error: 'Не удалось добавить книгу' }, 500);
  }
};

export const updateBook = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id;
    const bookId = c.req.param('id');
    const body = await c.req.json();

    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
        users: { some: { id: userId } }
      }
    });

    if (!existingBook) {
      return c.json({ success: false, error: 'Книга не найдена или доступ запрещен' }, 404);
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        title: body.title,
        author: body.author,
        description: body.description,
        image: body.image
      }
    });

    return c.json({ success: true, data: updatedBook });
  } catch (error) {
    return c.json({ success: false, error: 'Ошибка сервера при обновлении книги' }, 500);
  }
};

export const deleteBook = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id;
    const bookId = c.req.param('id');

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        users: {
          disconnect: { id: userId } 
        },

        folders: {
          disconnect: { userId: userId }
        }
      }
    });

    return c.json({ success: true, data: updatedBook, message: 'Книга успешно удалена из вашей библиотеки' });
  } catch (error) {
    return c.json({ success: false, error: 'Книга не найдена или доступ запрещен' }, 404);
  }
};