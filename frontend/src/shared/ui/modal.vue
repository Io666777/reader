<script setup lang="ts">
// Оставляем только базовые пропсы для управления состоянием окна
const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

defineEmits(['close', 'apply', 'reset']);
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      
      <!-- Шапка окна -->
      <div class="modal-header">
        <span class="modal-title">{{ title }}</span>
        <button class="close-icon" @click="$emit('close')">
          <img src="/list.svg" alt="close" />
        </button>
      </div>

      <!-- Основное тело (Слот для любого контента) -->
      <div class="modal-body">
        <slot></slot>
      </div>

      <!-- Футер с кнопками действий -->
      <div class="modal-footer">
        <button class="btn-reset" @click="$emit('reset')">Сбросить</button>
        <button class="btn-apply" @click="$emit('apply')">Применить</button>
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="sass">
.modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background: rgba(0, 0, 0, 0.4)
  display: flex
  align-items: center
  justify-content: center
  z-index: 999
  cursor: pointer

.modal-content
  background: white
  border-radius: 20px
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3)
  padding: 24px
  width: 100%
  max-width: 400px
  display: flex
  flex-direction: column
  gap: 20px
  cursor: default
  position: relative

.modal-header
  display: flex
  justify-content: space-between
  align-items: center
  
  .modal-title
    font-size: 18px
    font-weight: 700
    color: #333

  .close-icon
    background: none
    border: none
    cursor: pointer
    padding: 4px
    display: flex
    align-items: center
    opacity: 0.5
    &:hover
      opacity: 1

.modal-body
  max-height: 400px
  overflow-y: auto
  padding-right: 8px

  &::-webkit-scrollbar
    width: 4px
  &::-webkit-scrollbar-thumb
    background: #eee
    border-radius: 10px

.modal-footer
  display: flex
  gap: 12px
  padding-top: 10px

  button
    flex: 1
    padding: 12px
    border-radius: 12px
    font-size: 14px
    font-weight: 600
    cursor: pointer
    border: none
    transition: all 0.2s

    &:active
      transform: scale(0.98)

  .btn-reset
    background: #f5f5f5
    color: #666
    &:hover
      background: #eeeeee

  .btn-apply
    background: #2196f3
    color: white
    &:hover
      background: #1976d2
</style>