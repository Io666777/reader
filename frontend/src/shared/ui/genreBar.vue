<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  genres: string[];
}>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const firstGenre = computed(() => props.genres?.[0] || 'Без жанра');
const otherGenres = computed(() => props.genres?.slice(1) || []);

const toggleTooltip = () => {
  if (otherGenres.value.length > 0) {
    isOpen.value = !isOpen.value;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

const badgeStyle = computed(() => ({
  backgroundColor:
    props.genres?.length > 1 ? 'hsl(45, 90%, 70%)' : 'hsl(45, 90%, 90%)',
  cursor: otherGenres.value.length > 0 ? 'pointer' : 'default',
}));
</script>

<template>
  <div class="genre-container" ref="containerRef">
    <span class="genre-badge" :style="badgeStyle" @click.stop="toggleTooltip">
      {{ firstGenre }}
      <span v-if="otherGenres.length" class="plus-count"
        >+{{ otherGenres.length }}</span
      >
    </span>

    <div v-if="isOpen && otherGenres.length" class="genre-tooltip">
      <div class="tooltip-title">Все жанры:</div>
      <ul class="tooltip-list">
        <li v-for="g in genres" :key="g">{{ g }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="sass">
.genre-container
  position: relative
  display: inline-block

  &:hover .genre-tooltip
    display: block
    opacity: 1
    transform: translateX(-50%) translateY(0)

.genre-badge
  display: inline-block
  padding: 6px 12px
  border-radius: 12px
  font-size: 13px
  color: #333

.genre-tooltip
  display: block
  position: absolute
  top: 125% // Переместили вниз (было bottom: 125%)
  left: 50%
  transform: translateX(-50%) translateY(-10px)
  background: #ffffff // Перекрасили в белый
  color: #333 // Текст теперь темный для контраста
  padding: 12px
  border-radius: 8px
  width: max-content
  max-width: 200px
  z-index: 100
  box-shadow: 0 4px 15px rgba(0,0,0,0.15) // Сделали тень мягче
  opacity: 0
  transition: all 0.2s ease
  border: 1px solid #fafafa // Добавили легкую рамку, так как фон белый
  max-height: 200px
  overflow-y: auto

  // Треугольник (стрелочка) теперь сверху


.tooltip-title
  font-size: 11px
  text-transform: uppercase
  margin-bottom: 6px
  border-bottom: 1px solid #fafafa
  padding-bottom: 4px
  color: #999

.tooltip-list
  list-style: none
  padding: 0
  margin: 0
  font-size: 12px
  li
    margin-bottom: 2px
</style>
