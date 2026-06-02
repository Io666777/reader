import { Resend } from 'resend'
import { createClerkClient } from '@clerk/backend'
import prisma from '../../lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const FROM = process.env.EMAIL_FROM || 'reader@resend.dev'

export const sendEventReminderEmails = async (): Promise<void> => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  const dayAfter = new Date(tomorrow)
  dayAfter.setDate(dayAfter.getDate() + 1)

  const events = await prisma.event.findMany({
    where: {
      dueDate: { gte: tomorrow, lt: dayAfter },
      status: 'pending',
      user: { emailNotifications: true },
    },
    include: {
      user: true,
      folder: { select: { name: true } },
      book: { select: { title: true } },
    },
  })

  for (const event of events) {
    try {
      const clerkUser = await clerk.users.getUser(event.user.id)
      const email = clerkUser.emailAddresses[0]?.emailAddress
      if (!email) continue

      const context = event.folder
        ? `Папка: ${event.folder.name}`
        : event.book
        ? `Книга: ${event.book.title ?? 'Книга'}`
        : null

      const dueFormatted = new Date(event.dueDate).toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long',
      })

      const html = `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <h2 style="font-size:18px;margin:0 0 8px">🔔 Напоминание о событии</h2>
          <p style="font-size:15px;font-weight:600;margin:0 0 4px">${event.title}</p>
          ${context ? `<p style="font-size:13px;color:#6b7280;margin:0 0 4px">${context}</p>` : ''}
          <p style="font-size:13px;color:#6b7280;margin:0">Срок: ${dueFormatted} — завтра!</p>
        </div>
      `

      await resend.emails.send({
        from: FROM,
        to: email,
        subject: `Напоминание: «${event.title}» — срок завтра`,
        html,
      })
    } catch (e) {
      console.error(`[email] failed for event ${event.id}:`, e)
    }
  }
}
