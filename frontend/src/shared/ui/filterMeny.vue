<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  mode: 'local' | 'global';
  genres: Array<string | { name: string; count: number }>;
  years: string[];
}>();

const emit = defineEmits(['close', 'apply']);

const selectedGenre = ref<string | null>(null);
const selectedYear = ref<string | null>(null);

const resetFilters = () => {
  selectedGenre.value = null;
  selectedYear.value = null;
};

// Внедряем toggle методы
const toggleGenre = (genreName: string) => {
  selectedGenre.value = selectedGenre.value === genreName ? null : genreName;
};

const toggleYear = (year: string) => {
  selectedYear.value = selectedYear.value === year ? null : year;
};

const applyFilters = () => {
  emit('apply', {
    genre: selectedGenre.value,
    year: selectedYear.value,
  });
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="open" @click="$emit('close')">
    <div class="open__content" @click.stop>
      <div class="open__header">
        <span class="open__title">
          {{ mode === 'local' ? 'Моя библиотека' : 'Глобальный поиск' }}
        </span>
        <button class="close-icon" @click="$emit('close')">
          <img src="/list.svg" alt="close" />
        </button>
      </div>

      <div class="filter-body">
        <!-- Секция Жанров -->
        <div class="filter-group">
          <span class="filter-group__title">Жанры</span>
          <div class="filter-group__list">
            <button
              v-for="item in genres"
              :key="typeof item === 'string' ? item : item.name"
              class="filter-item"
              :class="{
                active:
                  typeof item === 'string'
                    ? selectedGenre === item
                    : selectedGenre === item.name,
              }"
              @click="toggleGenre(typeof item === 'string' ? item : item.name)"
            >
              <span class="name">{{
                typeof item === 'string' ? item : item.name
              }}</span>
              <span v-if="typeof item !== 'string'" class="count">{{
                item.count
              }}</span>
            </button>
          </div>
        </div>

        <!-- Секция Годов -->
        <div v-if="mode === 'local'" class="filter-group">
          <span class="filter-group__title">Год издания</span>
          <div class="filter-group__list">
            <button
              v-for="year in years"
              :key="year"
              class="filter-item"
              :class="{ active: selectedYear === year }"
              @click="toggleYear(year)"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>

      <div class="filter-footer">
        <button class="btn-reset" @click="resetFilters">Сбросить</button>
        <button class="btn-apply" @click="applyFilters">Применить</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.open
  // Теперь это оверлей на весь экран
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background: rgba(0, 0, 0, 0.4) // Затемнение фона
  display: flex
  align-items: center   // Центрирование по вертикали
  justify-content: center // Центрирование по горизонтали
  z-index: 999
  cursor: pointer // Указываем, что сюда можно кликнуть для закрытия

  &__content
    // Убираем лишние отступы, так как центрирует родитель
    background: white
    border-radius: 20px
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3)
    padding: 24px
    width: 100%
    max-width: 400px // Ограничиваем ширину модалки
    display: flex
    flex-direction: column
    gap: 20px
    cursor: default // Чтобы клик внутри модалки не считался кликом по фону
    position: relative

// Остальные стили (filter-body, filter-item) остаются прежними


  &__header
    display: flex
    justify-content: space-between
    align-items: center

.filter-body
  max-height: 400px // Общий лимит высоты для всей модалки
  overflow-y: auto // Вертикальный скролл для всего контента
  padding-right: 8px

  &::-webkit-scrollbar
    width: 4px
  &::-webkit-scrollbar-thumb
    background: #eee
    border-radius: 10px

.filter-group
  margin-bottom: 20px

  &__title
    display: block
    font-size: 12px
    font-weight: 600
    color: #bbb
    text-transform: uppercase
    margin-bottom: 12px

  &__list
    display: flex
    flex-wrap: wrap // Элементы переносятся на новую строку (никакого горизонтального скролла)
    gap: 8px

.filter-item
  display: flex
  align-items: center
  gap: 6px
  padding: 8px 14px
  border-radius: 12px
  border: 1px solid #f5f5f5
  background: #f8f9fa
  font-size: 14px
  cursor: pointer
  transition: all 0.2s
  color: #333

  &:hover
    background: #f0f0f0

  &.active
    background: #2196f3
    color: white
    border-color: #2196f3

    .count
      background: rgba(255, 255, 255, 0.2)
      color: white

  .count
    font-size: 11px
    background: #e9ecef
    padding: 2px 6px
    border-radius: 6px
    color: #777

.filter-footer
  display: flex
  gap: 12px
  padding-top: 10px

  button
    flex: 1
    padding: 12px
    border-radius: 12px
    font-size: 14px
    font-weight: 600
    cursor: pointer
    border: none
    transition: opacity 0.2s

    &:active
      opacity: 0.8

  .btn-reset
    background: #f5f5f5
    color: #666

  .btn-apply
    background: #2196f3
    color: white
</style>
