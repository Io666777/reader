<script setup lang="ts">
import bookCard from '../entities/book/ui/catalogBookCard.vue';
</script>

<template>
  <div class="books-grid">
    <bookCard />
    <bookCard />
    <bookCard />
    <bookCard />
    <bookCard />
    <bookCard />
    <bookCard />
  
  </div>
</template>

<style scoped lang="sass">
.books-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px
</style>