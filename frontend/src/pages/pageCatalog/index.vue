<script setup lang="ts">
import { ref } from "vue";
import bookSerch from "../../widgets/bookSerch/index.vue";
import catalogFilter from "../../widgets/bookFilter/index.vue";
import catalogBookCard from "../../entities/book/catalogBookCard.vue";
import type { BookDisplayData } from "../../entities/book/types";
import { getRandomBooks } from "./api/get-random-books";
import SingleRandomButton from "../../widgets/bookRandom/index.vue";
import GridRandomButton from "../../widgets/booksRandom/index.vue";

const books = ref<BookDisplayData[]>([]);
const isLoading = ref(false);
const selectedGenre = ref<string | null>(null);

const loadByFilters = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const response = await getRandomBooks(selectedGenre.value);
    if (response?.book) {
      books.value = response.book;
    }
  } catch (e) {
    books.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleApplyFilters = (filters: { genre: string | null }) => {
  selectedGenre.value = filters.genre;
  loadByFilters();
};

const handleSearchUpdate = (newBooks: BookDisplayData[]) => {
  selectedGenre.value = null;
  books.value = newBooks;
};

const handleGridUpdate = (newBooks: BookDisplayData[]) => {
  selectedGenre.value = null;
  books.value = newBooks;
};

const handleLoadingUpdate = (val: boolean) => {
  isLoading.value = val;
};
</script>

<template>
  <div class="page-layout">
    <div class="toolbar">
      <catalogFilter mode="global" @applyFilters="handleApplyFilters" />

      <bookSerch mode="global" @update:books="handleSearchUpdate" />

      <SingleRandomButton />

      <GridRandomButton
        @update:books="handleGridUpdate"
        @update:loading="handleLoadingUpdate"
      />
    </div>

    <div v-if="selectedGenre" class="active-filter">
      <span>Жанр: {{ selectedGenre }}</span>
      <button @click="handleApplyFilters({ genre: null })" class="reset-filter">
        ✕
      </button>
    </div>

    <div v-if="isLoading" class="status-state">Ищем книги</div>

    <div v-else-if="books.length" class="books-grid">
      <catalogBookCard v-for="item in books" :key="item.id" :book="item" />
    </div>

    <div v-else class="status-state">
      Жмите на кнопки
    </div>
  </div>
</template>

<style scoped lang="sass">
.page-layout
  padding: 24px
  display: flex
  flex-direction: column
  align-items: center
  gap: 24px

.toolbar
  width: 100%
  max-width: 800px
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
  margin-top: -12px

.books-grid
  display: grid
  width: 100%
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px

.status-state
  color: #888
  margin-top: 50px
  font-size: 1.1rem
  text-align: center

@media (max-width: 600px)
  .books-grid
    grid-template-columns: repeat(2, 1fr)
    gap: 16px
</style>
