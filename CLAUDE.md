# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

Monorepo with two separate apps:
- `backend/` — Hono (Node.js) REST API, TypeScript, Prisma + PostgreSQL
- `frontend/` — Vue 3 SPA, Vite, TypeScript, SASS

## Commands

### Backend (`backend/`)
```
npm run dev      # tsx watch — hot-reload dev server on port 16000
npm run build    # tsc compile to dist/
npm run start    # run compiled dist/src/index.js
npx prisma migrate dev   # apply schema migrations
npx prisma generate      # regenerate Prisma client after schema changes
```

### Frontend (`frontend/`)
```
npm run dev      # Vite dev server
npm run build    # vue-tsc type-check + Vite build
npm run preview  # preview production build
```

## Environment Variables

**backend/.env**
- `DATABASE_URL` — PostgreSQL connection string
- `PORT` — server port (default `16000`)
- `CLERK_SECRET_KEY` — Clerk backend secret
- `TELEGRAM_BOT_TOKEN` — Telegram Bot API token
- `TELEGRAM_WEBHOOK_SECRET` — secret query param for the Telegram webhook endpoint

**frontend/.env**
- `VITE_API_URL` — backend base URL (default: `http://localhost:16000/api`)
- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk publishable key

## Architecture

### Backend

Module-based structure under `src/modules/`. Each module has:
- `*.controller.ts` — business logic, Prisma queries, returns Hono `Response`
- `*.routes.ts` — Hono router, wires HTTP verbs to controller functions

**Auth flow**: Clerk middleware runs globally (`clerkMiddleware()`). Protected routes additionally use `clerkAuthMiddleware()` from `src/middleware/auth.ts`, which upserts the Clerk user into the local `User` table and sets `c.get('jwtPayload').id` for downstream use.

**Telegram integration** (`src/modules/telegram/`):
- `telegram.service.ts` — `sendMessage`, `sendEventReminders` (finds events due tomorrow and messages users), `connectTelegram` (saves chatId to User)
- `telegram.routes.ts` — `/webhook` (public, secret-token-guarded), `/status` (auth required), `/disconnect` (auth required)
- Connection flow: frontend generates a deep-link `https://t.me/<BOT>?start=<clerkUserId>` → user sends `/start <clerkUserId>` to bot → webhook receives it → `connectTelegram` saves `telegramChatId` on User

**Cron**: `node-cron` is installed and imported in `src/index.ts`. `sendEventReminders` is imported but the cron schedule call must be added there.

### Frontend

Follows **Feature-Sliced Design (FSD)**:
- `app/` — entry point, router, global styles, layouts
- `pages/` — route-level components (`home/`, `activity/`)
- `entities/` — domain types and cards (`book/`, `event/`)
- `features/` — user actions (`auth-by-clerk/`)
- `shared/` — reusable primitives (`shared/ui/`, `shared/api/`)

**Path alias**: `@` → `frontend/src/`

**API layer** (`shared/api/`): API modules export factory functions (e.g., `createEventsApi(getToken)`) that accept a Clerk token getter and return an object of typed `apiRequest` calls. The base `apiRequest` in `shared/api/base.ts` handles auth headers and JSON serialization.

**Clerk auth**: `@clerk/vue` — `useAuth()` provides `getToken` (for API calls) and `isSignedIn`. The router guard in `app/providers/router/index.ts` redirects unauthenticated users to `/auth`.

**Event navigation pattern**: Home page triggers navigation to `/activity?create=1&folderId=X&label=Y` to pre-fill the event creation form on the Activity page.

**SASS globals**: `variables` and `mixins` (including `+sm` breakpoint mixin) are auto-injected into every `.vue` component's `<style lang="sass">` via Vite preprocessor config — no explicit import needed.

### Data Model (Prisma)

`User` → owns `Folder[]`, `Book[]`, `Event[]`; stores optional `telegramChatId`  
`Folder` → belongs to User, many-to-many with `Book`, has `Event[]`  
`Book` → many-to-many with `Folder` and `User`, has `Event[]`  
`Event` → belongs to User, optionally linked to one Folder and/or one Book; has `startDate?`, `dueDate`, `status` (`pending`/`done`)
