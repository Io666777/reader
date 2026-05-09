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
    <svg
      width="18"
      height="18"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="10"
        width="80"
        height="80"
        rx="15"
        ry="15"
        fill="#e0e0e0"
      />
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="15"
        ry="15"
        fill="white"
        stroke="#ccc"
        stroke-width="2"
      />

      <g fill="black">
        <circle cx="30" cy="30" r="6" />
        <circle cx="30" cy="50" r="6" />
        <circle cx="30" cy="70" r="6" />

        <circle cx="70" cy="30" r="6" />
        <circle cx="70" cy="50" r="6" />
        <circle cx="70" cy="70" r="6" />
      </g>
    </svg>
  </contentButton>
</template>
