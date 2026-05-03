<script setup lang="ts">
import bookSerch from '../../widgets/bookSerch/index.vue';
import randomButtom from '../../widgets/bookRandom/index.vue'
import catalogBookCard from '../../entities/book/catalogBookCard.vue';
import type { BookDisplayData } from '../../entities/book/types';
import { ref } from 'vue';

const books = ref<BookDisplayData[]>([]);

const handleSearchUpdate = (newBooks: BookDisplayData[]) => {
  books.value = newBooks;
};
</script>

<template>
  <div class="search-page">
    <div class="search-bar">
      <bookSerch mode="global" @update:books="handleSearchUpdate" />
      <randomButtom></randomButtom>
    </div>

    <div v-if="books.length > 0" class="books-grid">
      <catalogBookCard
        v-for="item in books"
        :key="item.id || item.isbn"
        :book="item"
      />
    </div>

    <div v-else class="empty-results">
      Введите название книги или автора, чтобы начать поиск
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
