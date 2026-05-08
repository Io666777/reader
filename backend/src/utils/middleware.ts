import type { Context, Next } from 'hono';
import { authLib } from '../lib/auth';

export const authenticate = async (c: Context, next: Next) => {
  // 1. Получаем заголовок Authorization
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Доступ запрещен. Нужен токен.' }, 401);
  }

  // 2. Достаем токен
  const token = authHeader.split(' ')[1];

  // 3. Проверяем токен
  const decoded = authLib.verifyToken(token);

  if (!decoded) {
    return c.json({ message: 'Токен невалиден или просрочен.' }, 401);
  }

  // 4. Пробрасываем userId в контекст, чтобы контроллеры его видели
  c.set('userId', decoded.userId);
  
  await next();
};