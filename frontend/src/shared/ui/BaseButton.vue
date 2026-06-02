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
  cursor: pointer
  background: none
  border: none
  padding: 0

  &:disabled
    opacity: 0.35
    cursor: not-allowed

  &.page
    font-size: 12px
    font-weight: 600
    text-transform: uppercase
    letter-spacing: 0.07em
    color: #9ca3af

  &.action
    font-size: 13px
    font-weight: 400
    color: #111827
    padding: 5px 12px
    border: 1px solid #e5e7eb
    border-radius: 6px
    background: #fff
    white-space: nowrap

  &.danger
    font-size: 13px
    font-weight: 400
    color: #ef4444
    padding: 5px 12px
    border: 1px solid #fecaca
    border-radius: 6px
    background: #fff
    white-space: nowrap
</style>