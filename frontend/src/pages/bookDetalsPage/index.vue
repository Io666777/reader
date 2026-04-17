<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { Detals } from './types';
import { getDetals } from './api/get-detals';

const route = useRoute();
const bookId = route.params.id as string; // Получаем ID из URL

const book = ref<Detals | null>(null)
const isLoading = ref(true)

onMounted(async()=>{
  try{
    book.value = await getDetals(bookId);
  }catch(error){
    console.error("Не удалось загрузить детали:", error);
  }finally{
    isLoading.value=false
  }
})
</script>

<template>
  <h1>{{ book?.title }}</h1>
  <p>{{ book?.description }}</p>
  <p>{{ book?.image}}</p>
  <p>{{ book?.reliseYear}}</p>
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