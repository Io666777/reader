<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import type { Detals } from './types';
import { getDetals } from './api/get-detals';
import { addBook } from './api/add-book';
import { deleteBook } from './api/delete-book';
import GenreBar from '../../shared/ui/genreBar.vue';
import BaseButton from '../../shared/ui/baseButton.vue';

const route = useRoute();
const router = useRouter();
const bookId = route.params.id as string;

const book = ref<Detals | null>(null);
const isLoading = ref(true);
const isProcessing = ref(false);

const bookPage = computed(() => {
  return route.query.from === 'home' || (book.value && !book.value.isExternal);
});

onMounted(async () => {
  if (book.value !== null) return;
  try {
    book.value = await getDetals(bookId);
  } catch (error) {
    console.error('Не удалось загрузить детали:', error);
  } finally {
    isLoading.value = false;
  }
});

const handleAction = async () => {
  if (!book.value || isProcessing.value) return;

  isProcessing.value = true;
  try {
    if (bookPage.value) {
      await deleteBook(book.value.id);
      router.push({ name: 'home' });
    } else {
      await addBook(book.value);
      book.value.isExternal = false;
      alert('Книга добавлена!');
    }
  } catch (error: any) {
    alert(error.message || 'Произошла ошибка');
  } finally {
    isProcessing.value = false;
  }
};

const goBack = () => router.back();
</script>

<template>
  <div class="book-details">
    <header class="book-details__header">
      <button class="back-btn" @click="goBack">← Назад</button>
    </header>

    <div v-if="isLoading" class="loading">Загрузка данных о книге...</div>

    <div v-else-if="book" class="info-card">
      <div class="info-card__content">
        <div class="info-card__image-container">
          <div class="image-wrapper">
            <div class="status-icon"></div>

            <img
              v-if="book.image"
              :src="book.image"
              :alt="book.title"
              class="book-image"
            />
            <div v-else class="image-placeholder">Нет обложки</div>
          </div>
          <BaseButton
            :variant="bookPage ? 'dell' : 'add'"
            :text="bookPage ? 'убрать с полки' : 'добавить на полку'"
            class="add-button"
            @click="handleAction"
          />
        </div>

        <div class="info-card__text-container">
          <h1 class="title">{{ book.title }}</h1>
          <p>{{ book.author }}</p>

          <div v-if="book.genres?.length" class="genres-row">
            <GenreBar :genres="book.genres" />
          </div>

          <p class="year">
            Год издания: <strong>{{ book.realiseYear || 'Неизвестно' }}</strong>
          </p>

          <div class="description-section">
            <h3>Описание</h3>
            <p class="description-text">{{ book.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="error-state">
      Книга не найдена. Возможно, ID неверный.
    </div>
  </div>
</template>

<style scoped lang="sass">
.book-details
  padding: 20px
  max-width: 900px
  margin: 0 auto
  font-family: sans-serif

  &__header
    margin-bottom: 20px

  .back-btn
    background: #f8f9fa
    border: 1px solid #dee2e6
    padding: 8px 16px
    border-radius: 8px
    cursor: pointer
    transition: all 0.2s
    &:hover
      background: #e2e6ea

  .info-card
    background: #fff
    padding: 30px
    border-radius: 16px
    min-height: 500px
    box-shadow: 0 10px 25px rgba(0,0,0,0.08)
    overflow: hidden

    &__content
      display: flex
      gap: 40px
      align-items: flex-start

      @media (max-width: 600px)
        flex-direction: column
        align-items: center

  .info-card__image-container
    flex-shrink: 0
    width: 250px
    display: flex
    flex-direction: column
    align-items: center
    gap: 15px

    .image-wrapper
      position: relative // Нужно для абсолютного позиционирования звезды
      width: 100%

    .status-icon
      position: absolute
      top: -10px
      left: -10px
      z-index: 10
      width: 40px
      height: 40px
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2))

    .add-button
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 16px;

    .book-image
      width: 100%
      height: auto
      border-radius: 8px
      box-shadow: 0 4px 8px rgba(0,0,0,0.1)

    .image-placeholder
      width: 100%
      height: 350px
      background: #eee
      display: flex
      align-items: center
      justify-content: center
      border-radius: 8px
      color: #888

  .info-card__text-container
    flex-grow: 1
    min-width: 0

    .genres-row
      margin-bottom: 15px

    .title
      margin: 0 0 10px 0
      font-size: 2rem
      color: #2c3e50

    .year
      color: #666
      margin-bottom: 20px

    .description-section
      margin-top: 20px

      h3
        margin-bottom: 8px
        border-bottom: 1px solid #eee
        padding-bottom: 4px

      .description-text
        line-height: 1.6
        display: -webkit-box
        -webkit-line-clamp: 15
        -webkit-box-orient: vertical
        overflow: hidden
        text-overflow: ellipsis
        color: #444
        white-space: pre-line

  .loading, .error-state
    text-align: center
    padding: 50px
    color: #666
</style>
