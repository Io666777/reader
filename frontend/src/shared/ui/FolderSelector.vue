<script setup lang="ts">
import { MOCK_FOLDERS } from "@/entities/book/model/mock";

defineProps<{
  modelValue: string | null
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="selector-container">
    <span class="selector-title">Выбрать папку:</span>
    <label v-for="folder in MOCK_FOLDERS" :key="folder.id" class="option-item">
      <input 
        type="radio" 
        :checked="modelValue === folder.id"
        @change="$emit('update:modelValue', folder.id)"
      />
      {{ folder.title }}
    </label>
  </div>
</template>

<style scoped lang="sass">
.selector-container
  display: flex
  flex-direction: column
  gap: 8px
  padding: 12px
  border: 1px solid #e2e8f0
  border-radius: 12px
  max-height: 200px
  overflow-y: auto

.selector-title
  font-size: 11px
  font-weight: 700
  color: #94a3b8
  text-transform: uppercase
  margin-bottom: 4px

.option-item
  display: flex
  align-items: center
  gap: 8px
  font-size: 14px
  cursor: pointer
  padding: 4px 0
  &:hover
    color: #64748b
</style>