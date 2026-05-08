import { Hono } from 'hono';
import { authController } from './auth/authController';

const auth = new Hono();

auth.post('/register', authController.register);
auth.post('/login', authController.login);

export default auth;