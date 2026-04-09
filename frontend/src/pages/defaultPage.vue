<script setup lang="ts">
import bookCard from '../entities/book/ui/bookCard.vue';
</script>

<template>
  <div class="book-grid">
    <bookCard class="book-card">...</bookCard>
    <bookCard class="book-card">...</bookCard>
    <bookCard class="book-card">...</bookCard>
    <bookCard class="book-card">...</bookCard>
  </div>
</template>

<style scoped lang="sass">
.book-grid
  display: grid
  // 'auto-fill' автоматически создает столько колонок, сколько влезет
  // 'minmax(160px, 1fr)' — карточка не может быть меньше 160px,
  // но может растягиваться, чтобы заполнить пустоту
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))

  // Отступы: 32px между рядами, 20px между колонками
  gap: 32px 20px

  // Чтобы сетка не прилипала к краям экрана
  padding: 20px

  // Центрируем сетку, если карточек мало
  width: 100%
  max-width: 1200px
  margin: 0 auto

  // Выравнивание самих карточек по центру их ячеек
  justify-items: center

// Опционально: адаптация для совсем маленьких телефонов
@media (max-width: 400px)
  .book-grid
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))
    gap: 20px 12px
    padding: 10px
</style>
