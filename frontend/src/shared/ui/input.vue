<script setup lang="ts">
// Определяем пропсы для гибкости
defineProps<{
  modelValue: string | number | null
  placeholder?: string
  type?: string
}>()

// Определяем события для работы v-model
const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-input-wrapper">
    <input
      :value="modelValue"
      :type="type || 'text'"
      :placeholder="placeholder"
      class="base-input"
      @input="onInput"
    />
  </div>
</template>

<style lang="sass" scoped>
.base-input-wrapper
  width: 100%

.base-input
  width: 100%
  padding: 12px 20px
  border: 1px solid #ddd
  border-radius: 12px
  font-size: 16px
  outline: none
  background: #fdfdfd
  transition: all 0.2s ease
  font-family: inherit

  &:focus
    border-color: #2196f3
    background: #fff
    box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.1)

  &::placeholder
    color: #aaa
</style>