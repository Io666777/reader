import type { Context } from 'hono'
import prisma from '../../lib/prisma'

const include = {
  folder: { select: { id: true, name: true } },
  book: { select: { id: true, title: true } },
}

export const getEvents = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id
    const events = await prisma.event.findMany({
      where: { userId },
      include,
      orderBy: { dueDate: 'asc' },
    })
    return c.json({ success: true, data: events })
  } catch {
    return c.json({ success: false, error: 'Ошибка при получении событий' }, 500)
  }
}

export const createEvent = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id
    const body = await c.req.json()

    if (!body.title || !body.dueDate) {
      return c.json({ success: false, error: 'Название и дата обязательны' }, 400)
    }

    const event = await prisma.event.create({
      data: {
        title: body.title,
        startDate: body.startDate ? new Date(body.startDate) : null,
        dueDate: new Date(body.dueDate),
        userId,
        folderId: body.folderId || null,
        bookId: body.bookId || null,
      },
      include,
    })
    return c.json({ success: true, data: event }, 201)
  } catch (e) {
    console.error('[createEvent]', e)
    return c.json({ success: false, error: 'Не удалось создать событие' }, 500)
  }
}

export const updateEvent = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id
    const eventId = c.req.param('id')
    const body = await c.req.json()

    const existing = await prisma.event.findFirst({ where: { id: eventId, userId } })
    if (!existing) return c.json({ success: false, error: 'Событие не найдено' }, 404)

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: body.title ?? existing.title,
        startDate: body.startDate !== undefined
          ? (body.startDate ? new Date(body.startDate) : null)
          : existing.startDate,
        dueDate: body.dueDate ? new Date(body.dueDate) : existing.dueDate,
        status: body.status ?? existing.status,
      },
      include,
    })
    return c.json({ success: true, data: updated })
  } catch {
    return c.json({ success: false, error: 'Ошибка при обновлении события' }, 500)
  }
}

export const deleteEvent = async (c: Context) => {
  try {
    const userId = c.get('jwtPayload').id
    const eventId = c.req.param('id')

    const existing = await prisma.event.findFirst({ where: { id: eventId, userId } })
    if (!existing) return c.json({ success: false, error: 'Событие не найдено' }, 404)

    await prisma.event.delete({ where: { id: eventId } })
    return c.json({ success: true })
  } catch {
    return c.json({ success: false, error: 'Ошибка при удалении события' }, 500)
  }
}
