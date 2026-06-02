# Backend

REST API на [Hono](https://hono.dev/) + Prisma + PostgreSQL.

## Запуск

```bash
npm install
npm run dev      # tsx watch, порт 16000
npm run build    # tsc → dist/
npm run start    # node dist/src/index.js
```

## Переменные окружения

Создай файл `.env` в корне `backend/`:

```env
PORT=16000

# Neon PostgreSQL
DATABASE_URL=postgresql://...

# Clerk
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# UploadThing
UPLOADTHING_TOKEN=...

# Resend (email-напоминания)
RESEND_API_KEY=re_...
EMAIL_FROM=you@yourdomain.com   # или onboarding@resend.dev для тестов
```

## База данных

```bash
npx prisma db push        # синхронизировать схему
npx prisma generate       # обновить клиент после изменений схемы
npx prisma studio         # GUI для БД
```

## Структура

```
src/
├── index.ts                  # точка входа, роуты, cron
├── middleware/
│   └── auth.ts               # Clerk middleware, upsert пользователя
├── lib/
│   └── prisma.ts             # Prisma клиент
└── modules/
    ├── book/                 # книги
    ├── folder/               # папки
    ├── event/                # события
    ├── user/                 # профиль пользователя
    ├── email/                # email-напоминания (Resend)
    └── upload/               # загрузка файлов (UploadThing)
```

## Email-напоминания

Cron-задача запускается каждый день в 09:00 — находит события со сроком завтра и отправляет письмо на email пользователя из Clerk. Пользователи с отключёнными уведомлениями (`emailNotifications: false`) пропускаются.
