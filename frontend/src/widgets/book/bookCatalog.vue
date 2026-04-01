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
    grid-template-columns: 1fr 1fr
    gap: 5px
</style>
