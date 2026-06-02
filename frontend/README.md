# Frontend

Vue 3 SPA на Vite + TypeScript + SASS.

## Запуск

```bash
npm install
npm run dev      # Vite dev server
npm run build    # vue-tsc + vite build → dist/
npm run preview  # предпросмотр продакшн-сборки
```

## Переменные окружения

Создай файл `.env` в корне `frontend/`:

```env
VITE_API_URL=http://localhost:16000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_...
```

При деплое замени `VITE_API_URL` на URL продакшн-бэкенда.

## Структура (Feature-Sliced Design)

```
src/
├── app/
│   ├── layouts/        # MainLayout (навигация + контент)
│   ├── providers/
│   │   └── router/     # Vue Router + Clerk guard
│   └── styles/         # глобальные стили, переменные, миксины
├── pages/
│   ├── home/           # полка книг и папок
│   ├── activity/       # события, дедлайны, heatmap
│   ├── reader/         # ридер FB2 / DOCX / PDF
│   └── profile/        # email, уведомления, выход
├── entities/
│   ├── book/           # BookCard, FolderCard, типы
│   └── event/          # типы событий
├── features/
│   └── auth-by-clerk/  # форма входа/регистрации
└── shared/
    ├── api/            # фабрики API-клиентов (books, events, folders, user)
    └── ui/             # BaseButton, BaseInput, FileUpload и др.
```

## Форматы книг

| Формат | Рендеринг |
|--------|-----------|
| FB2 | XML-парсер на клиенте → HTML |
| DOCX | mammoth.js → HTML |
| PDF | нативный `<iframe>` браузера |

Позиция чтения сохраняется в `localStorage` по `bookId`.
