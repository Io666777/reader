<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  items: { id: string; label: string }[]
  title?: string
}>()

const emit = defineEmits(['update:modelValue'])

const toggleItem = (id: string) => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(id)
  index === -1 ? newValue.push(id) : newValue.splice(index, 1)
  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="selector-container">
    <span class="selector-title">{{ title ?? 'Выбрать:' }}</span>
    <label v-for="item in items" :key="item.id" class="option-item">
      <input
        type="checkbox"
        :checked="modelValue.includes(item.id)"
        @change="toggleItem(item.id)"
      />
      {{ item.label }}
    </label>
  </div>
</template>

<style scoped lang="sass">
.selector-container
  display: flex
  flex-direction: column
  gap: 6px
  padding: 12px
  border: 1px solid #e5e7eb
  border-radius: 8px
  max-height: 180px
  overflow-y: auto

.selector-title
  font-size: 11px
  font-weight: 600
  text-transform: uppercase
  letter-spacing: 0.06em
  color: #9ca3af
  margin-bottom: 2px

.option-item
  display: flex
  align-items: center
  gap: 8px
  font-size: 13px
  color: #111827
  cursor: pointer
  padding: 3px 0
</style>