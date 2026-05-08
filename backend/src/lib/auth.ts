import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined in .env file');
}

const SALT_ROUNDS = 10;

export const authLib = {
 
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },
 
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  },
 
  createToken(userId: string): string {
    const secret = JWT_SECRET as string;
    const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];
    return jwt.sign({ userId }, secret, {
      expiresIn: expiresIn
    });
  },
 
  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET as string) as { userId: string };
    } catch (error) {
      return null;
    }
  }
};