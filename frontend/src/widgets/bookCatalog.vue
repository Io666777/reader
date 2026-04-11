<script setup lang="ts">
import bookCard from '../entities/book/ui/catalogBookCard.vue';
import type { BookDisplayData } from '../entities/book/types';

const books: BookDisplayData[]=([])
</script>

<template>
  <div class="books-grid">
    <bookCard v-for="item in books" :key="item.id" :book="item" />

  </div>
</template>

<style scoped lang="sass">
.books-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px
</style>