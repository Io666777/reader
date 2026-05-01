<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import filterMeny from '../../shared/ui/filterMeny.vue';
import filterButton from '../../shared/ui/filterButton.vue';
import { getGlobal } from './api/get-global';
import { getLocal } from './api/get-local';

const props = defineProps<{
  mode: 'local' | 'global';
}>();

const emit = defineEmits(['applyFilters']);

const isFilterOpen = ref(false);

const genresData = ref<any[]>([]);
const yearsData = ref<string[]>([]);

const loadData = async () => {
  try {
    if (props.mode === 'local') {
      const response = await getLocal();
      genresData.value = response.genres;
      yearsData.value = response.years;
    } else {
      const response = await getGlobal();
      // Глобальный поиск возвращает только массив строк[cite: 4]
      genresData.value = response.genres;
    }
  } catch (error) {
    console.error('Ошибка загрузки фильтров:', error);
  }
};

onMounted(loadData);

const handleApply = (filters: {
  genre: string | null;
  year: string | null;
}) => {
  emit('applyFilters', filters);
  isFilterOpen.value = false;
};

const filteredGenres = computed(() => {
  if (props.mode === 'global') {
    return genresData.value;
  }
  return genresData.value.filter((item) => {
    if (typeof item === 'object' && item !== null) {
      return item.count > 0;
    }
    return true;
  });
});
</script>

<template>
  <div class="filter-wrapper">
    <filterButton
      :is-open="isFilterOpen"
      @click="isFilterOpen = !isFilterOpen"
    />

    <filterMeny
      :is-open="isFilterOpen"
      :mode="mode"
      :genres="filteredGenres"
      :years="yearsData"
      @close="isFilterOpen = false"
      @apply="handleApply"
    />
  </div>
</template>

<style scoped lang="sass">
.filter-wrapper
  position: relative
  display: inline-block
</style>
