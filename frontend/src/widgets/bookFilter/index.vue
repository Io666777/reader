<script setup lang="ts">
import { ref } from 'vue';
import FilterBook from '../../features/filter-book/index.vue';

// Пропсы для синхронизации со страницей
const genre = defineModel<string>('genre');
const year = defineModel<string | number>('year');

const isOpen = ref(false);
</script>

<template>
  <div class="filter-widget">
    <!-- Кнопка, которая видна всегда -->
    <button @click="isOpen = !isOpen" class="trigger-btn">
      Фильтры
    </button>

    <!-- Выпадающее меню (появляется только при isOpen)[cite: 4] -->
    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-content">
        <FilterBook v-model:genre="genre" v-model:year="year" />
        <button @click="isOpen = false" class="close-btn">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.filter-widget
  position: relative
  display: inline-block

.dropdown
  position: absolute
  top: 100%
  right: 0
  margin-top: 8px
  z-index: 100
  background: white
  border-radius: 12px
  box-shadow: 0 8px 24px rgba(0,0,0,0.15)
  border: 1px solid #eee
  min-width: 220px
</style>