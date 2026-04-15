<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const bookId = route.params.id; // Получаем ID из URL

// Состояние для данных книги (пока пустое)
const bookData = ref(null);

onMounted(() => {
  console.log('Загружаем данные для книги с ID:', bookId);
  // Здесь будет fetch запрос к твоему API
});
</script>

<template>
  <div class="book-details">
    <header class="book-details__header">
      <button @click="$router.back()" class="back-btn">← Назад</button>
      <h1>Страница книги</h1>
    </header>

    <main class="book-details__content">
      <div class="info-card">
        <p><strong>ID книги:</strong> {{ bookId }}</p>
        <p>{{ }}</p>
        
        <div v-if="bookId === 'no-id'" class="warning">
          У этой книги отсутствует ISBN. Скорее всего, это редкое издание или ошибка в Open Library.
        </div>
        
        <p v-else>
          Тут мы скоро выведем полное описание, обложку и отзывы для книги.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="sass">
.book-details
  padding: 20px
  max-width: 800px
  margin: 0 auto

  &__header
    display: flex
    align-items: center
    gap: 20px
    margin-bottom: 30px

  .back-btn
    background: none
    border: 1px solid #ccc
    padding: 8px 16px
    border-radius: 8px
    cursor: pointer
    &:hover
      background: #f0f0f0

  .info-card
    background: #fff
    padding: 24px
    border-radius: 12px
    box-shadow: 0 4px 12px rgba(0,0,0,0.05)

  .warning
    margin-top: 15px
    padding: 12px
    background: #fff3cd
    color: #856404
    border-radius: 6px
    border: 1px solid #ffeeba
</style>