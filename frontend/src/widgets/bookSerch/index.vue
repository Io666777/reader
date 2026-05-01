<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import baseInput from '../../shared/ui/baseInput.vue';
import BookCard from '../../entities/book/catalogBookCard.vue';
import { getBySerch } from './api/get-by-serch';
import { getMyBooks } from './api/get-my-books';
import type { BookDisplayData } from '../../entities/book/types';

// Принимаем режим поиска от родительской страницы
const props = defineProps<{
  mode: 'local' | 'global'
}>();

const route = useRoute();
const router = useRouter();
const books = ref<BookDisplayData[]>([]);
const searchQuery = ref('');

const handleSearch = async () => {
  const trimmedQuery = searchQuery.value.trim();

  // Синхронизируем текст поиска с URL[cite: 3]
  router.replace({
    query: { ...route.query, q: trimmedQuery || undefined },
  });

  // Логика для пустого запроса
  if (!trimmedQuery) {
    if (props.mode === 'local') {
      // В локальном режиме при пустом поиске показываем все книги[cite: 5]
      books.value = await getMyBooks(''); 
    } else {
      books.value = [];
    }
    return;
  }

  try {
    // Выбираем метод API в зависимости от пропса[cite: 3]
    if (props.mode === 'global') {
      // Поиск во внешнем API (Google Books)
      books.value = await getBySerch(trimmedQuery);
    } else {
      // Поиск в твоей базе данных через Prisma
      books.value = await getMyBooks(trimmedQuery);
    }
  } catch (e) {
    console.error('Ошибка поиска:', e);
    books.value = [];
  }
};

// Следим за вводом текста
watch(searchQuery, handleSearch);

onMounted(async () => {
  const queryFromUrl = route.query.q as string;
  if (queryFromUrl) {
    searchQuery.value = queryFromUrl;
  }
  // Запускаем первичную загрузку[cite: 3]
  await handleSearch(); 
});
</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <div class="controls">
        <!-- Передаем режим в инпут для динамического плейсхолдера -->
        <baseInput
          v-model="searchQuery"
          :mode="props.mode"
        />
      </div>
    </div>

    <div class="books-grid">
      <!-- Используем универсальный ключ для карточек[cite: 3] -->
      <BookCard
        v-for="item in books"
        :key="item.id || item.isbn"
        :book="item"
      />
      
      <!-- Динамическое сообщение о пустом результате -->
      <div v-if="books.length === 0 && searchQuery" class="no-results">
        Ничего не нашли в 
        {{ props.mode === 'local' ? 'вашем списке' : 'мировой библиотеке' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.search-page
  padding: 20px
  width: 100%

.search-header
  display: flex
  justify-content: center
  margin-bottom: 30px
  max-width: 600px
  margin-left: auto
  margin-right: auto

.controls
  width: 100%

.books-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px

.no-results
  grid-column: 1 / -1
  text-align: center
  color: #888
  margin-top: 50px
</style>