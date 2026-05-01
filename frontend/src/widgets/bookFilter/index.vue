<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import modal from '../../shared/ui/modal.vue'; 
import contentButton from '../../shared/ui/contentButton.vue';
import { getGlobal } from './api/get-global';
import { getLocal } from './api/get-local';

const props = defineProps<{
  mode: 'local' | 'global';
}>();

const emit = defineEmits(['applyFilters']);

const isFilterOpen = ref(false);

// Данные из API
const genresData = ref<any[]>([]);
const yearsData = ref<string[]>([]);

// Состояние выбранных фильтров[cite: 4]
const selectedGenre = ref<string | null>(null);
const selectedYear = ref<string | null>(null);

const loadData = async () => {
  try {
    if (props.mode === 'local') {
      const response = await getLocal();
      genresData.value = response.genres;
      yearsData.value = response.years;
    } else {
      const response = await getGlobal();
      genresData.value = response.genres;
    }
  } catch (error) {
    console.error('Ошибка загрузки фильтров:', error);
  }
};

onMounted(loadData);

// Логика выбора (Toggle)[cite: 4]
const toggleGenre = (genre: string) => {
  selectedGenre.value = selectedGenre.value === genre ? null : genre;
};

const toggleYear = (year: string) => {
  selectedYear.value = selectedYear.value === year ? null : year;
};

// Действия в футере[cite: 2, 4]
const handleReset = () => {
  selectedGenre.value = null;
  selectedYear.value = null;
};

const handleApply = () => {
  emit('applyFilters', {
    genre: selectedGenre.value,
    year: selectedYear.value,
  });
  isFilterOpen.value = false;
};

const filteredGenres = computed(() => {
  if (props.mode === 'global') return genresData.value;
  return genresData.value.filter((item) => {
    return typeof item === 'object' ? item.count > 0 : true;
  });
});

</script>

<template>
  <div class="filter-wrapper">
    <!-- Кнопка вызова фильтров[cite: 1, 4] -->
    <contentButton
      :isOpen="isFilterOpen"
      @click="isFilterOpen = !isFilterOpen"
    >
      <img src="/list.svg" alt="filter icon" />
    </contentButton>

    <!-- Модальное окно[cite: 2, 4] -->
    <modal
      :isOpen="isFilterOpen"
      :title="mode === 'local' ? 'Фильтры библиотеки' : 'Поиск по жанрам'"
      @close="isFilterOpen = false"
      @reset="handleReset"
      @apply="handleApply"
    >
      <div class="filter-sections">
        <!-- Секция Жанров -->
        <div class="filter-group">
          <span class="filter-group__title">Жанры</span>
          <div class="filter-group__list">
            <button
              v-for="item in filteredGenres"
              :key="typeof item === 'string' ? item : item.name"
              class="filter-item"
              :class="{ active: (typeof item === 'string' ? item : item.name) === selectedGenre }"
              @click="toggleGenre(typeof item === 'string' ? item : item.name)"
            >
              <span class="name">{{ typeof item === 'string' ? item : item.name }}</span>
              <span v-if="typeof item !== 'string'" class="count">{{ item.count }}</span>
            </button>
          </div>
        </div>

        <!-- Секция Годов (только для локального режима)[cite: 4] -->
        <div v-if="mode === 'local' && yearsData.length" class="filter-group">
          <span class="filter-group__title">Год издания</span>
          <div class="filter-group__list">
            <button
              v-for="year in yearsData"
              :key="year"
              class="filter-item"
              :class="{ active: year === selectedYear }"
              @click="toggleYear(year)"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="sass">
.filter-wrapper
  display: inline-block

.filter-sections
  display: flex
  flex-direction: column
  gap: 8px

.filter-group
  margin-bottom: 24px
  
  &__title
    display: block
    font-size: 11px
    font-weight: 700
    color: #a0a0a0
    text-transform: uppercase
    letter-spacing: 0.5px
    margin-bottom: 12px

  &__list
    display: flex
    flex-wrap: wrap
    gap: 8px

.filter-item
  display: flex
  align-items: center
  gap: 8px
  padding: 6px 12px
  background: #f5f5f5
  border: 1px solid transparent
  border-radius: 8px
  font-size: 13px
  cursor: pointer
  transition: all 0.2s
  color: #333

  &:hover
    background: #eeeeee

  &.active
    background: #2196f3
    color: white
    border-color: #2196f3

    .count
      background: rgba(255, 255, 255, 0.2)
      color: white

  .count
    font-size: 10px
    background: #e0e0e0
    padding: 2px 6px
    border-radius: 4px
    color: #666
</style>