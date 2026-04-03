<script setup lang="ts">
import bookCard from '../../entities/book/bookCard.vue';
</script>

<template>
  <div class="bookList">
    <bookCard />
    <bookCard />
    <bookCard />
  </div>
</template>

<style lang="sass" scoped>
.bookList
    display: grid
    gap: 24px
    padding: 24px

    // Адаптивная сетка:
    // Минимум 250px, максимум сколько поместится
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))

    // Для больших экранов - максимум 4 колонки
    @media (min-width: 1200px)
        grid-template-columns: repeat(4, 1fr)

    // Для планшетов - 3 колонки
    @media (max-width: 1024px)
        grid-template-columns: repeat(3, 1fr)

    // Для маленьких планшетов - 2 колонки
    @media (max-width: 768px)
        grid-template-columns: repeat(2, 1fr)

    // Для телефонов - 1 колонка
    @media (max-width: 480px)
        grid-template-columns: 1fr

    .book-card
        height: 100% // Чтобы все карточки были одинаковой высоты
</style>
