<script setup lang="ts">
import FilterButton from '../filterButton/index.vue';

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// const toggleSidebar
</script>

<template>
  <div class="base-input">
    <div class="base-input__wrapper">
      <span class="base-input__icon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>

      <input
        type="text"
        :value="modelValue"
        @input="onInput"
        class="base-input__field"
        placeholder="Поиск книг..."
      />
      <!-- <FilterButton :is-loaded="true" @click="toggleSidebar" /> -->
    </div>
  </div>
</template>

<style scoped lang="sass">
.base-input
  width: 100%
  max-width: 500px // Ограничим ширину, чтобы поиск не растягивался на весь экран

  &__wrapper
    position: relative
    display: flex
    align-items: center

  &__icon
    position: absolute
    left: 16px
    display: flex
    align-items: center
    justify-content: center
    color: #999 // Спокойный серый цвет для иконки
    pointer-events: none // Чтобы иконка не мешала клику по инпуту

  &__field
    width: 100%
    padding: 12px 16px 12px 48px // Большой отступ слева под иконку
    font-size: 15px
    font-family: inherit
    color: #2c3e50
    background-color: #f1f3f5 // Светло-серый фон
    border: 2px solid transparent // Прозрачная рамка, чтобы инпут не "прыгал" при фокусе
    border-radius: 12px
    outline: none
    transition: all 0.2s ease

    &::placeholder
      color: #adb5bd

    &:hover
      background-color: #e9ecef

    &:focus
      background-color: #fff
      border-color: #2196f3 // Твой основной синий цвет
      box-shadow: 0 4px 12px rgba(33, 150, 243, 0.1)
</style>
