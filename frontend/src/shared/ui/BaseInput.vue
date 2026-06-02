<script setup lang="ts">
defineProps<{
  modelValue: string | number
  placeholder?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    class="base-input"
  />
</template>

<style scoped lang="sass">
.base-input
  flex-grow: 1
  min-width: 0
  padding: 6px 10px
  border: 1px solid #e5e7eb
  border-radius: 6px
  font-size: 13px
  outline: none
  background: #fff
  color: #111827

  &::placeholder
    color: #9ca3af
</style>