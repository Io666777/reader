<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import baseInput from '../../shared/ui/baseInput.vue';
import BookCard from '../../entities/book/catalogBookCard.vue';
import { getBySerch } from './api/get-by-serch';
import type { BookDisplayData } from '../../entities/book/types';

const route = useRoute();
const router = useRouter();
const books = ref<BookDisplayData[]>([]);
const searchQuery = ref('');

onMounted(async () => {
  const queryFromUrl = route.query.q as string;
  if (queryFromUrl) {
    searchQuery.value = queryFromUrl;
    // Сразу загружаем данные, чтобы пользователь не видел пустой экран
    books.value = await getBySerch(queryFromUrl);
  }
});

const handleSearch = async () => {
  const trimmedQuery = searchQuery.value.trim();

  // Обновляем URL (делаем q=текст), чтобы браузер запомнил состояние
  router.replace({
    query: { ...route.query, q: trimmedQuery || undefined },
  });

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
  <serchButton />
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
