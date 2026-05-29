<script setup lang="ts">
import { ref } from 'vue'
import type { Folder, Book } from '../model/types'
import BookCard from './BookCard.vue'

const props = defineProps<{
  folder: Folder
  books: Book[]
}>()

const isOpen = ref(false)
</script>

<template>
  <div class="folder-wrapper">
    <div class="folder-card" @click="isOpen = !isOpen">
      <div class="folder-info">
        <span class="folder-name">{{ folder.name }}</span>
      </div>
      <span class="count-badge">{{ isOpen ? 'Свернуть' : books.length + ' книг' }}</span>
    </div>

    <Transition name="slide">
      <div v-if="isOpen" class="folder-content">
        <BookCard 
          v-for="book in books" 
          :key="book.id" 
          :book="book" 
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
.folder-wrapper
  width: 100%

.folder-card
  display: flex
  justify-content: space-between
  padding: 16px 20px
  background-color: #f8fafc
  border: 1px solid #e2e8f0
  border-radius: 12px
  cursor: pointer

.folder-content
  padding-left: 20px
  border-left: 2px solid #e2e8f0
  margin-top: 8px
  overflow: hidden
</style>