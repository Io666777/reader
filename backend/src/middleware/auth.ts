// src/middlewares/auth.ts
import type { MiddlewareHandler } from 'hono';
import { getAuth } from '@clerk/hono';
import prisma from '../lib/prisma'; // Твой клиент Prisma из prisma.ts

export const clerkAuthMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const auth = getAuth(c);

    if (!auth || !auth.userId) {
      return c.json({ error: 'Пользователь не авторизован' }, 401);
    }

    const clerkUserId = auth.userId;

    try {
      const sessionClaims = auth.sessionClaims;
      const email = (sessionClaims as any)?.primary_email || `${clerkUserId}@clerk.local`;

      const user = await prisma.user.upsert({
        where: { id: clerkUserId },
        update: {}, 
        create: {
          id: clerkUserId,
          email: email,
          username: email.split('@')[0]
        },
      });

      c.set('jwtPayload', { id: user.id });

      await next();
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      return c.json({ error: 'Внутренняя ошибка авторизации на сервере' }, 500);
    }
  };
};