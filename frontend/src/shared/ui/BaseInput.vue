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
  padding: 8px 12px
  border: 1px solid #e2e8f0
  border-radius: 6px
  font-size: 14px
  outline: none
  transition: border-color 0.2s
  background-color: #f9fafb

  
</style>