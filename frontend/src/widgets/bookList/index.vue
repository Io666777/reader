<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import BookCard from '../../entities/book/catalogBookCard.vue';
import type { BookDisplayData } from '../../entities/book/types';
import { getBooks } from './api/get-book';
import { getFetchBook } from './api/get-fetch';
import baseInput from '../../shared/ui/baseInput.vue';
import filterButton from '../../shared/ui/filterButton.vue';

const books = ref<BookDisplayData[]>([]);
const searchQuery = ref('');
const selectedGenre = ref('');
const selectedYear = ref('')

const isMenuOpen = ref(false);

const loadBooks = async () => {
  try {
    const data = await getBooks();
    books.value = data;
  } catch (error) {
    console.error('Ошибка загрузки книг:', error);
  }
};

const uploadResults = async () => {
  books.value = await getFetchBook({
    q: searchQuery.value,
    genre: selectedGenre.value,
    year: selectedYear.value
  });
};

const openFilterMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  console.log('Меню фильтров:', isMenuOpen.value);
};

watch([searchQuery, selectedGenre, selectedYear], () => {
  uploadResults();
});
onMounted(loadBooks);
</script>

<template>
  <div class="input-content">
    <baseInput v-model="searchQuery" />
    <filterButton :is-loaded="true" @click="openFilterMenu" />
  </div>
  <div class="books-grid">
    <BookCard v-for="item in books" :key="item.id" :book="item" />
  </div>
</template>

<style scoped lang="sass">
.books-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px
.input-content
  display: flex
</style>
