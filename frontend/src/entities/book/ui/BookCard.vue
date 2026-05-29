<script setup lang="ts">
import type { Book } from '../model/types'

defineProps<{
  book: Book
}>()
</script>

<template>
  <div class="book-card">
    <div class="meta-side">
      <span class="file-badge">{{ book.fileType.toUpperCase() }}</span>
      <div class="titles">
        <h4 class="title">{{ book.title }}</h4>
        <p class="author">{{ book.author }}</p>
      </div>
    </div>

    <div class="progress-side">
      <span class="percentage">Прогресс: {{ book.progress }}%</span>
      <div class="bar">
        <div class="fill" :style="{ width: book.progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.book-card
  display: flex
  align-items: center
  justify-content: space-between
  padding: 14px 20px
  border-bottom: 1px solid #e2e8f0
  background: none
  transition: background-color 0.15s ease

  &:hover
    background-color: #f8fafc

.meta-side
  display: flex
  align-items: center
  gap: 16px

.file-badge
  font-size: 11px
  font-weight: 700
  color: #94a3b8
  background-color: #f1f5f9
  padding: 4px 8px
  border-radius: 6px

.titles
  display: flex
  flex-direction: column

.title
  font-size: 15px
  font-weight: 600
  color: #000000
  margin: 0

.author
  font-size: 13px
  color: #94a3b8
  margin: 2px 0 0 0

.progress-side
  display: flex
  flex-direction: column
  align-items: flex-end
  gap: 6px
  min-width: 120px

.percentage
  font-size: 12px
  font-weight: 500
  color: #64748b

.bar
  width: 100%
  height: 4px
  background-color: #f1f5f9
  border-radius: 2px
  overflow: hidden

.fill
  height: 100%
  background-color: #000000 // Линия прогресса черная, как активная вкладка навбара
</style>