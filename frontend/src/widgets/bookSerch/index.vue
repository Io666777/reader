<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import baseInput from '../../shared/ui/baseInput.vue';
import { getBySerch } from './api/get-by-serch';
import { getMyBooks } from './api/get-my-books';

const props = defineProps<{ mode: 'local' | 'global' }>();

// Эмитим массив найденных книг родителю
const emit = defineEmits(['update:books']);

const searchQuery = ref('');

const handleSearch = async () => {
  const trimmedQuery = searchQuery.value.trim();
  let results = [];

  try {
    if (props.mode === 'global') {
      results = trimmedQuery ? await getBySerch(trimmedQuery) : [];
    } else {
      results = await getMyBooks(trimmedQuery);
    }
    // Передаем результат наверх[cite: 3]
    emit('update:books', results);
  } catch (e) {
    emit('update:books', []);
  }
};

watch(searchQuery, handleSearch);
onMounted(handleSearch);
</script>

<template>
  <div class="search-controls">
    <baseInput v-model="searchQuery" :mode="props.mode" />
  </div>
</template>

<style scoped lang="sass">
.search-page
  padding: 20px
  width: 100%

.search-header
  display: flex
  justify-content: center
  margin-bottom: 30px
  max-width: 600px
  margin-left: auto
  margin-right: auto

.controls
  width: 100%

.books-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr))
  gap: 32px 24px
  padding: 24px

.no-results
  grid-column: 1 / -1
  text-align: center
  color: #888
  margin-top: 50px
</style>
