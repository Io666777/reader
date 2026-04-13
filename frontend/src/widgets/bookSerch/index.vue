<script setup lang="ts">
import { ref, watch } from 'vue';
import baseInput from '../../shared/ui/baseInput.vue';
import BookCard from '../../entities/book/ui/catalogBookCard.vue';
import { getBySerch } from './api/get-by-serch';
import type { BookDisplayData } from '../../entities/book/types';

const books = ref<BookDisplayData[]>([]);
const searchQuery = ref('');

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    books.value = [];
    return;
  }
  try {
    // Вызываем твой метод бэкенда (тот самый, что идет в Open Library)
    books.value = await getBySerch(searchQuery.value);
  } catch (e) {
    console.error('Ошибка поиска:', e);
  }
};

// Поиск срабатывает сам, когда ты печатаешь
watch(searchQuery, handleSearch);
</script>

<template>
  <baseInput v-model="searchQuery" />
  <div class="books-grid">
    <BookCard v-for="item in books" :key="item.isbn" :book="item" />
  </div>
</template>

<style scoped lang="sass">
.books-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px
</style>
