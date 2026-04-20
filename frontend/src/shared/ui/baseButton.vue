<script setup lang="ts">
defineProps<{
  text: string;
  variant: 'add' | 'dell';
  isLoading?: boolean;
}>();
</script>

<template>
  <button
    class="app-btn"
    :class="[`app-btn--${variant}`]"
    :disabled="isLoading"
  >
    <span v-if="isLoading" class="loader"></span>
    <slot v-else>{{ text }}</slot>
  </button>
</template>

<style scoped lang="sass">
.app-btn
  display: inline-flex
  align-items: center
  justify-content: center
  padding: 10px 20px
  border-radius: 12px // В стиле твоей info-card
  font-size: 16px
  font-weight: 600
  cursor: pointer
  transition: all 0.2s ease
  border: none
  gap: 8px
  font-family: sans-serif

  &:active
    transform: scale(0.98)

  &:disabled
    opacity: 0.6
    cursor: not-allowed

  // Основной стиль (Зеленый, как твоя звезда)
  &--add
    background-color: #4CAF50
    color: white
    &:hover
      background-color: #43a047
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3)

  // Вторичный стиль (Желтый/Оранжевый)
  &--dell
    background-color: #FFC107
    color: #333
    &:hover
      background-color: #ffb300
      box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3)

.loader
  width: 18px
  height: 18px
  border: 2px solid rgba(255, 255, 255, 0.3)
  border-radius: 50%
  border-top-color: #fff
  animation: spin 0.8s linear infinite

@keyframes spin
  to { transform: rotate(360deg) }
</style>