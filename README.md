# Reader

Приложение для управления книгами и событиями чтения. Монорепозиторий с отдельными бэкендом и фронтендом.

## Стек

| | Технологии |
|---|---|
| **Backend** | Hono, Node.js, TypeScript, Prisma, PostgreSQL (Neon) |
| **Frontend** | Vue 3, Vite, TypeScript, SASS |
| **Auth** | Clerk |
| **Файлы** | UploadThing |
| **Email** | Resend |

## Быстрый старт

```bash
# Backend
cd backend
npm install
npm run dev        # :16000

# Frontend
cd frontend
npm install
npm run dev        # :5173
```

## Структура

```
reader/
├── backend/       # Hono REST API
└── frontend/      # Vue 3 SPA
```

Подробнее — в README каждого приложения.
