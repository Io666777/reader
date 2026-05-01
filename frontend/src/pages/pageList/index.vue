<script setup lang="ts">
import bookSerch from '../../widgets/bookSerch/index.vue';
import filterForBook from '../../widgets/bookFilter/index.vue';
import catalogBookCard from '../../entities/book/catalogBookCard.vue';
import type { BookDisplayData } from '../../entities/book/types';
import { computed, onMounted, ref } from 'vue';
import { getBooks } from './api/get-book';

const allBooks = ref<BookDisplayData[]>([]);
const activeFilters = ref<{ genre: string | null; year: string | null }>({
  genre: null,
  year: null,
});

// 2. Загружаем книги при старте страницы
onMounted(async () => {
  try {
    const data = await getBooks();
    allBooks.value = data; // Наполняем массив для начального отображения
  } catch (error) {
    console.error('Ошибка первичной загрузки:', error);
  }
});

// 3. Обработка поиска (обновляет весь массив)
const handleSearchUpdate = (newBooks: BookDisplayData[]) => {
  allBooks.value = newBooks;
};

// 4. Обработка фильтров (не меняет массив, только скрывает лишнее)
const handleFilters = (f: { genre: string | null; year: string | null }) => {
  activeFilters.value = f;
};

// 5. Вычисляемый список (то, что мы реально видим)[cite: 3, 6]
const displayedBooks = computed(() => {
  return allBooks.value.filter((book) => {
    const matchGenre = activeFilters.value.genre
      ? book.genres?.includes(activeFilters.value.genre)
      : true;
    const matchYear = activeFilters.value.year
      ? book.year === activeFilters.value.year
      : true;
    return matchGenre && matchYear;
  });
});
</script>

<template>
  <div class="page-layout">
    <div class="toolbar">
      <filterForBook mode="local" @applyFilters="handleFilters" />
      <!-- Поиск теперь только поставляет данные -->
      <bookSerch mode="local" @update:books="handleSearchUpdate" />
    </div>

    <!-- Отрисовка теперь только ТУТ[cite: 4] -->
    <div class="books-grid">
      <catalogBookCard v-for="item in displayedBooks" :key="item.id" :book="item" />
    </div>
  </div>
</template>

<style scoped lang="sass">
.books-grid
  display: grid
  width: 100%
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px
</style>