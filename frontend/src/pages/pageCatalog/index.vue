<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bookSerch from '../../widgets/bookSerch/index.vue';
import randomButtom from '../../widgets/bookRandom/index.vue';
import catalogFilter from '../../widgets/bookFilter/index.vue'; // Тот самый indexф.vue
import catalogBookCard from '../../entities/book/catalogBookCard.vue';
import type { BookDisplayData } from '../../entities/book/types';
import { getRandomBooks } from './api/get-random-books';

const books = ref<BookDisplayData[]>([]);
const isLoading = ref(false);

const selectedGenre = ref<string | null>(null);

const loadBooks = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const response = await getRandomBooks(selectedGenre.value);

    if (response?.book) {
      books.value = response.book;
    }
  } catch (error) {
    console.error('Ошибка:', error);
    books.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleApplyFilters = (filters: { genre: string | null }) => {
  selectedGenre.value = filters.genre;
  loadBooks();
};

const handleSearchUpdate = (newBooks: BookDisplayData[]) => {
  books.value = newBooks;
};

const handleRandomClick = () => {
  loadBooks();
};

onMounted(async () => {
  await loadBooks();
});
</script>

<template>
  <div class="search-page">
    <div class="search-bar">
      <catalogFilter mode="global" @applyFilters="handleApplyFilters" />

      <bookSerch mode="global" @update:books="handleSearchUpdate" />

      <randomButtom @click="handleRandomClick" />
    </div>

    <div v-if="selectedGenre" class="active-filter">
      <span>Жанр: {{ selectedGenre }}</span>
      <button @click="handleApplyFilters({ genre: null })" class="reset-filter">
        ✕
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      Ищем интересные книги для вас...
    </div>

    <div v-else-if="books.length" class="books-grid">
      <catalogBookCard v-for="item in books" :key="item.id" :book="item" />
    </div>

    <div v-else class="empty-results">
      Ничего не нашлось. Попробуйте изменить параметры фильтра.
    </div>
  </div>
</template>

<style scoped lang="sass">
.search-page
  padding: 20px
  display: flex
  flex-direction: column
  align-items: center
  gap: 30px

.search-bar
  width: 100%
  max-width: 800px // Увеличил, чтобы влез фильтр
  display: flex
  gap: 12px
  align-items: center

.active-filter
  display: flex
  align-items: center
  gap: 8px
  background: #f0f7ff
  color: #007bff
  padding: 6px 14px
  border-radius: 20px
  font-size: 14px
  border: 1px solid #d1e9ff

  .reset-filter
    background: none
    border: none
    color: #007bff
    cursor: pointer
    font-weight: bold
    &:hover
      color: #ff4d4f

.books-grid
  display: grid
  width: 100%
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px

.loading-state, .empty-results
  color: #888
  margin-top: 50px
  font-size: 1.1rem
</style>
