<script setup lang="ts">
import bookSerch from '../../widgets/bookSerch/index.vue';
import filterForBook from '../../widgets/bookFilter/index.vue';
import { computed, ref } from 'vue';

const allBooks = ref([]);

const activeFilters = ref({
  genre: null as string | null,
  year: null as string | null,
});

const handleFilters = (filters: {
  genre: string | null;
  year: string | null;
}) => {
  console.log('Данные получены от компонента фильтров:', filters);
  activeFilters.value = filters;
};

const displayedBooks = computed(() => {
  return allBooks.value.filter((book) => {
    // Если жанр выбран, проверяем совпадение
    const matchGenre = activeFilters.value.genre
      ? book.genre === activeFilters.value.genre
      : true;

    // Если год выбран, проверяем совпадение
    const matchYear = activeFilters.value.year
      ? book.year === activeFilters.value.year
      : true;

    return matchGenre && matchYear;
  });
});
</script>

<template>
  <filterForBook mode="local" @applyFilters="handleFilters" />
  <bookSerch mode="local" />
</template>
