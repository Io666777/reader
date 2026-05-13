<script setup lang="ts">
import { ref } from "vue";
import type { BookDisplayData } from "../../entities/book/types";
import contentButton from "../../shared/ui/contentButton.vue";
import { getRandomBooks } from "./api/get-random-books";

const emit = defineEmits<{
  (e: 'update:books', books: BookDisplayData[]): void
  (e: 'update:loading', loading: boolean): void
}>();

const isLoading = ref(false);

const loadGridBooks = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  emit('update:loading', true);

  try {
    const response = await getRandomBooks();
    if (response?.book) {
      emit('update:books', response.book);
    }
  } catch (error) {
    console.error("Ошибка хаоса:", error);
    emit('update:books', []);
  } finally {
    isLoading.value = false;
    emit('update:loading', false);
  }
};
</script>

<template>
  <contentButton :is-open="true" @click="loadGridBooks" title="Заполнить сетку рандомом">
    <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 30C15 30 25 10 50 15C75 20 85 40 85 40C85 40 95 60 70 80C45 100 20 85 20 85C20 85 5 70 15 30Z" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <path d="M30 40C40 20 60 30 50 50C40 70 20 60 30 40Z" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M70 35C80 50 65 70 50 60C35 50 50 30 70 35Z" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M48 42L50 35L52 42L60 45L52 48L50 55L48 48L40 45L48 42Z" fill="currentColor"/>
    </svg>
  </contentButton>
</template>