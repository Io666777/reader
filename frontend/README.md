# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

src/
├── app/                # Инициализация (App.vue, router, store, styles)
│   ├── providers/      # Обертки (Vue Router, Pinia)
│   └── index.ts        # Точка входа
│
├── pages/              # Целые страницы (композиция фич)
│   ├── search-page/    # Страница поиска
│   └── library-page/   # Страница "Моя полка"
│
├── widgets/            # Крупные блоки (Header, BookList + Actions)
│   └── book-catalog/   # Сетка книг с кнопками управления
│
├── features/           # Действия пользователя (User Intent)
│   ├── add-book/       # Логика кнопки "Добавить" (POST /add)
│   ├── delete-book/    # Логика удаления (DELETE /id)
│   └── search-by-title/# Поисковая строка (GET /search)
│
├── entities/           # Бизнес-единицы (Data & UI модели)
│   └── book/           # Компонент карточки (BookCard), типы (interface Book)
│
├── shared/             # Переиспользуемый "фундамент"
│   ├── api/            # Базовый инстанс axios/fetch
│   └── ui/             # Кнопки, инпуты, лоадеры (BaseButton.vue)