<script setup lang="ts">
import bookSerch from '../../widgets/bookSerch/index.vue';
import randomButtom from '../../widgets/bookRandom/index.vue';
import catalogBookCard from '../../entities/book/catalogBookCard.vue';
import type { BookDisplayData } from '../../entities/book/types';
import { getRandomBooks } from './api/get-random-books';
import { onMounted, ref } from 'vue';

const books = ref<BookDisplayData[]>([]);
const isLoading = ref(false);

const handleSearchUpdate = (newBooks: BookDisplayData[]) => {
  books.value = newBooks;
};

const loadRandomBooks = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const response = await getRandomBooks();

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

onMounted(async () => {
  if (books.value.length === 0 && !isLoading.value) {
    await loadRandomBooks();
  }
});
</script>

<template>
  <div class="search-page">
    <div class="search-bar">
      <bookSerch mode="global" @update:books="handleSearchUpdate" />
      <randomButtom @click="loadRandomBooks" />
    </div>

    <div v-if="isLoading" class="loading-state">
      Ищем интересные книги для вас...
    </div>

    <div v-else-if="books.length" class="books-grid">
      <catalogBookCard v-for="item in books" :key="item.id" :book="item" />
    </div>

    <div v-else class="empty-results">
      Ничего не нашлось. Попробуйте обновить страницу.
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
  max-width: 600px

.books-grid
  display: grid
  width: 100%
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px

.empty-results
  color: #888
  margin-top: 50px
  font-size: 1.1rem
</style>
