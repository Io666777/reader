import { Hono } from 'hono'
import { getAuth } from '@clerk/hono'
import prisma from '../../lib/prisma'

const userRouter = new Hono()

userRouter.get('/me', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { email: true, emailNotifications: true },
  })

  if (!user) return c.json({ error: 'Not found' }, 404)
  return c.json(user)
})

userRouter.patch('/me', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

  const body = await c.req.json()
  if (typeof body.emailNotifications !== 'boolean') {
    return c.json({ error: 'emailNotifications must be boolean' }, 400)
  }

  const user = await prisma.user.update({
    where: { id: auth.userId },
    data: { emailNotifications: body.emailNotifications },
    select: { email: true, emailNotifications: true },
  })

  return c.json(user)
})

export default userRouter
