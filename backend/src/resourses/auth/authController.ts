import type { Context } from 'hono';
import { authService } from './postAuth'; // Твой файл с логикой

export const authController = {
  async register(c: Context) {
    try {
      const body = await c.req.json();

      const result = await authService.register(body);

      return c.json(result, 201);
    } catch (error: any) {
      return c.json({ error: error.message }, 400);
    }
  },

  async login(c: Context) {
    try {
      const body = await c.req.json();
      const result = await authService.login(body);
      
      return c.json(result, 200);
    } catch (error: any) {
      return c.json({ error: error.message }, 401);
    }
  }
};