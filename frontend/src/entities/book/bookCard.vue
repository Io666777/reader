<script setup lang="ts">
// Принимаем объект книги как пропс
defineProps<{
  book: {
    bookName: string
    image?: string
    realiseYear?: string
    author?: {
      name: string
    }
  }
}>()
</script>

<template>
  <div class="card">
    <div class="card-image">
      <img
        :src="book.image || 'https://via.placeholder.com/300x200?text=No+Cover'"
        :alt="book.bookName"
      />
    </div>
    <div class="card-content">
      <p class="title">{{ book.bookName }}</p>
      
      <p class="description">
        {{ book.author?.name || 'Автор неизвестен' }}
      </p>
      
      <p class="price">{{ book.realiseYear || 'Год не указан' }}</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// Твой SASS оставляем как есть, он отличный!
// Единственное: если у тебя в карточке теперь год, 
// можно чуть уменьшить шрифт для .price или переименовать класс.
.card
    // ... твой код ...
    .price
        font-size: 18px // Для года 20px может быть многовато
        color: #757575 // Серый цвет для года выглядит спокойнее
</style>