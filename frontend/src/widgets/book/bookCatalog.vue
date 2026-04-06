<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchBooks } from '../../entities/book/api'; 
import bookCard from '../../entities/book/bookCard.vue';
import type { Book } from './types'; // Поправлено с tupes на types

const props = defineProps<{
  searchQuery?: string;
  filters?: any;
}>();

const books = ref<Book[]>([]);
const isLoading = ref(false);

// Добавляем аргумент query со значением по умолчанию
const loadBooks = async (query = props.searchQuery) => {
  isLoading.value = true;
  try {
    // Передаем актуальный query в API
    books.value = await fetchBooks(query);
  } catch (error) {
    console.error('Ошибка при получении книг:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => loadBooks());

watch(
  () => props.searchQuery,
  (newQuery) => {
    loadBooks(newQuery); 
  }
);

// Если хочешь, чтобы фильтры тоже работали (например, жанр)
watch(() => props.filters, () => {
  loadBooks();
}, { deep: true });
</script>

<template>
  <div class="book-list">
    <div v-if="isLoading">Загрузка...</div>
    
    <div v-else-if="books.length === 0">Книги не найдены</div>

    <template v-else>
      <bookCard 
        v-for="book in books" 
        :key="book.id" 
        :book="book" 
      />
    </template>
  </div>
</template>