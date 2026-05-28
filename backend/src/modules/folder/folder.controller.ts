import type { Context } from 'hono';
import prisma from '../../lib/prisma';

export const getUserFolders = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id;
    const folders = await prisma.folder.findMany({
      where: { userId }
    });
    return c.json({ success: true, data: folders });
  } catch (error) {
    return c.json({ success: false, error: 'Ошибка сервера' }, 500);
  }
};

export const createFolder = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id;
    const body = await c.req.json();
    
    if (!body.name) return c.json({ error: 'Имя обязательно' }, 400);

    const folder = await prisma.folder.create({
      data: { name: body.name, userId }
    });
    return c.json({ success: true, data: folder }, 201);
  } catch (error) {
    return c.json({ success: false, error: 'Не удалось создать папку' }, 500);
  }
};

export const updateFolder = async (c: Context) => {
  try{
    const userId = c.get('jwtPayload').id;
    const folderId = c.req.param('id')
    const body = await c.req.json()

    if(!body.name){
      return c.json({success: false, error: 'Новое имя папки обязательно'}, 400)
    }

    const folder = await prisma.folder.update({
      where: { 
        id: folderId,
        userId: userId
      },
      data: {
        name: body.name
      }
    });

    return c.json({ success: true, data: folder });
  } catch (error){
    return c.json({success: false, error: 'Папка не найдена или доступ запрещен' }, 404);
  }
}

export const deleteFolder = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id;
    const folderId = c.req.param('id');

    const deletedFolder = await prisma.folder.delete({
      where: {
        id: folderId,
        userId: userId
      }
    });

    return c.json({ success: true, message: 'Папка успешно удалена', data: deletedFolder });
  } catch (error) {
    return c.json({ success: false, error: 'Папка не найдена или доступ запрещен' }, 404);
  }
};