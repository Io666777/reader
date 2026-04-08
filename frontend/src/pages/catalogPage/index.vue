<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import bookLibrary from '../../widgets/book/bookCatalog.vue';
import baseButton from '../../shared/ui/button.vue';
import baseInput from '../../shared/ui/input.vue';
import bookCard from '../../entities/book/bookCard.vue';
import type { ExternalBook } from './types.ts';

const searchQuery = ref('');
const externalBooks = ref<ExternalBook[]>([]); // Книги из внешнего API
const isLoading = ref(false);

// Функция поиска через Open Library (твой бэкэнд)
const searchBooks = async (title: string) => {
  if (title.length < 3) {
    externalBooks.value = [];
    return;
  }
  isLoading.value = true;
  try {
    const response = await fetch(
      `http://localhost:3000/book/search?title=${encodeURIComponent(title)}`
    );
    externalBooks.value = await response.json(); // Данные из serch.controller.ts
  } catch (e) {
    console.error('Ошибка:', e);
  } finally {
    isLoading.value = false;
  }
};

// Дебаунс для ввода
let timeout: any;
watch(searchQuery, (newVal) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => searchBooks(newVal), 500);
});

// Состояние фильтров
const showFilters = ref(false);
const filters = reactive({
  /* ... твои фильтры ... */
});

const saveToMyLibrary = async (book: ExternalBook) => {
  try {
    // Вызываем ваш API (маршрут /book/add в route.ts)
    const response = await fetch('http://localhost:3000/book/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Передаем данные в формате, который ожидает addBook.ts
      body: JSON.stringify({
        isbn: book.isbn,
        title: book.title,
        cover: book.cover,
        year: book.year,
        author: book.author, // Бэкенд сам создаст автора через connectOrCreate
      }),
    });

    if (response.ok) {
      alert(`Книга "${book.title}" успешно добавлена в вашу библиотеку!`);
      // Очищаем поиск, чтобы вернуться к основному каталогу
      searchQuery.value = '';
      externalBooks.value = [];
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Произошла ошибка при сохранении');
    }
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error);
    alert('Не удалось связаться с сервером');
  }
};
</script>

<template>
  <div class="search-page">
    <header class="search-header">
      <baseInput
        mode="external"
        v-model="searchQuery"
        placeholder="Введите название книги..."
      />
      <baseButton @click="showFilters = true" type="transition"
        >Фильтры</baseButton
      >
    </header>

<main class="content">
  <div v-if="isLoading" class="status">Ищем в сети...</div>

  <div v-else-if="externalBooks.length > 0" class="book-grid">
    <div v-for="book in externalBooks" :key="book.isbn" class="external-book-wrapper">
       <bookCard 
          :book="{
            bookName: book.title,
            image: book.cover ?? undefined,
            realiseYear: String(book.year),
            author: { name: book.author },
          }"
        />
        <baseButton type="add" @click="saveToMyLibrary(book)">+</baseButton>
    </div>
  </div>

  <bookLibrary 
    v-else-if="searchQuery.trim() === ''" 
    :key="'library-' + searchQuery"
    :filters="filters" 
  />

  <div v-else-if="searchQuery.length > 2" class="status">
    В сети ничего не найдено
  </div>
</main>
  </div>
</template>

<style lang="sass" scoped>
.book-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
  gap: 24px
  margin-top: 20px

.external-book-wrapper
  display: flex
  flex-direction: column
  gap: 10px
</style>
