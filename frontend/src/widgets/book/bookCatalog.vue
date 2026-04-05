<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchBooks } from '../../entities/book/api'; // импортируем функцию запроса
import bookCard from '../../entities/book/bookCard.vue';
import type { Book } from './tupes';

// Принимаем поисковый запрос от родителя (главной страницы)
const props = defineProps<{
  searchQuery?: string;
}>();

const books = ref<Book[]>([]);
const isLoading = ref(false);

// Функция загрузки данных
const loadBooks = async () => {
  isLoading.value = true;
  try {
    // Вызываем API, который мы настроили ранее
    books.value = await fetchBooks(props.searchQuery);
  } catch (error) {
    console.error('Ошибка при получении книг:', error);
  } finally {
    isLoading.value = false;
  }
};

// Загружаем при первом открытии
onMounted(loadBooks);

// Следим за вводом в поиск: как только searchQuery меняется, делаем новый запрос
watch(
  () => props.searchQuery,
  () => {
    loadBooks();
  }
);
</script>

<template>
  <div class="bookList">
    <div v-if="isLoading" class="loader">Загрузка книг...</div>

    <div v-else-if="books.length === 0" class="empty">Книги не найдены</div>

    <template v-else>
      <bookCard v-for="book in books" :key="book.id" :book="book" />
    </template>
  </div>
</template>

<style lang="sass" scoped>
// Твой отличный SASS-код оставляем без изменений
.bookList
    display: grid
    gap: 24px
    padding: 24px
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))

    @media (min-width: 1200px)
        grid-template-columns: repeat(4, 1fr)

    @media (max-width: 1024px)
        grid-template-columns: repeat(3, 1fr)

    @media (max-width: 768px)
        grid-template-columns: repeat(2, 1fr)

    @media (max-width: 480px)
        grid-template-columns: 1fr

.loader, .empty
    grid-column: 1 / -1
    text-align: center
    padding: 40px
    font-size: 1.2rem
    color: #666
</style>
