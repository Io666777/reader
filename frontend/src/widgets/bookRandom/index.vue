<script setup lang="ts">
import router from '../../app/providers/router';
import contentButton from '../../shared/ui/contentButton.vue';
import { getRandom } from './api/get-random-book';

const randomClick = async () => {
  try {
    const response = await getRandom();
    const book = response?.book; 

    if (book && book.id) {
      router.push({ name: 'bookDetals', params: { id: book.id } });
    } else {
    
      console.warn('Метаданные поиска:', response?.metadata);
    }
  } catch (error) {
    console.error('Хаос не удался:', error);
  }
};
</script>

<template>
  <contentButton :is-open="true" @click="randomClick">
    <img src="/chaos.svg" />
  </contentButton>
</template>
