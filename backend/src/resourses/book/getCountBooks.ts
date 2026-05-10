import type { Context } from "hono";
import prisma from "../../lib/prisma";

export const getCoutBooks = async (c: Context) => {
  try {
    const payload = c.get('jwtPayload');

    if (!payload || !payload.id) {
      console.error("Payload не найден в контексте");
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userId = payload.id;

    const user = await prisma.user.findUnique({
      where: { id: userId }, 
      select: {
        _count: {
          select: { userBooks: true }
        }
      }
    });

    if (!user) return c.json({ error: "User not found" }, 404);

    return c.json({
      booksCount: user._count?.userBooks || 0
    });

  } catch (error: any) {
    console.error("PRISMA ERROR:", error.message);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};