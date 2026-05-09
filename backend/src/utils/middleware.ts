import type { Context, Next } from 'hono';
import { authLib } from '../lib/auth';

// middleware/authenticate.ts
export const authenticate = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Доступ запрещен. Нужен токен.' }, 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = authLib.verifyToken(token);

  if (!decoded) {
    return c.json({ message: 'Токен невалиден или просрочен.' }, 401);
  }

  // СОХРАНЯЕМ ТАК, КАК ЖДУТ КОНТРОЛЛЕРЫ
  c.set('jwtPayload', { id: decoded.userId }); 
  
  await next();
};