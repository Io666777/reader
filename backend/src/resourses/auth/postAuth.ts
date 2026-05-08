import { authLib } from "../../lib/auth";
import prisma from "../../lib/prisma";


export const authService = {
  async register(userData: any) {
    const { email, password, username } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Пользователь с таким email уже существует');

    const hashedPassword = await authLib.hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    });

    const token = authLib.createToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username 
      }
    };
  },

  async login(credentials: any) {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await authLib.verifyPassword(password, user.password))) {
      throw new Error('Неверный email или пароль');
    }

    const token = authLib.createToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username 
      }
    };
  }
};