<script setup lang="ts">
defineProps<{
  variant?: 'page' | 'action' | 'danger';
}>();
</script>

<template>
  <button class="base-btn" :class="variant || 'primary'">
    <slot />
  </button>
</template>

<style scoped lang="sass">
.base-btn
  /* Общие стили, если есть */
  cursor: pointer
  transition: all 0.2s

  &.page
    padding: 0 12px
    height: 30px
    background: #f9fafb
    border: none
    border-radius: 6px
    font-size: 13px
    font-weight: 700
    text-transform: uppercase
    letter-spacing: 0.05em
    color: #94a3b8
    &:hover
      background: #f1f5f9

  &.action
    padding: 8px 16px
    border-radius: 8px
    border: 1px solid #e2e8f0
    background: #f9fafb
    font-size: 12px
    font-weight: 600
    &:hover
      background: #f1f5f9

  &.danger
    padding: 8px 16px
    border-radius: 8px
    border: 1px solid #e2e8f0
    background: #fff5f5 // легкий красный фон для удаления
    color: #e53e3e
    font-size: 12px
    font-weight: 600
    &:hover
      background: #fee2e2
</style>