<script setup lang="ts">
import { ref, onMounted } from 'vue';  
import BookCard from '../entities/book/ui/catalogBookCard.vue';
import type { BookDisplayData } from '../entities/book/types';
import { getBooks } from '../entities/book/api/get-book';

const books = ref<BookDisplayData[]>([]);

const loadBooks = async () => {
  try {
    const data = await getBooks();
    books.value = data;
  } catch (error) {
    console.error('Ошибка загрузки книг:', error);
  }
};

onMounted(loadBooks);
</script>

<template>
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
</style>
