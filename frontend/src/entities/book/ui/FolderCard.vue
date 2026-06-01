<script setup lang="ts">
import { ref } from "vue";
import type { Folder, Book } from "../model/types";
import BookCard from "./BookCard.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";

const props = defineProps<{
  folder: Folder;
  books: Book[];
}>();

// Добавляем события управления папкой
const emit = defineEmits(["view-activity", "delete", "remove-folder", "edit-folder"]);

const isOpen = ref(false);
</script>

<template>
  <div class="folder-wrapper">
    <div class="folder-card">
      <div class="folder-info" @click="isOpen = !isOpen">
        <span class="folder-name">{{ folder.name }}</span>
        <span class="count-badge">{{ books.length }} книг</span>
      </div>
      
      <div class="folder-actions">
        <BaseButton variant="action" @click="emit('edit-folder', folder.id)">Изменить</BaseButton>
        <BaseButton variant="danger" @click="emit('remove-folder', folder.id)">Удалить</BaseButton>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="isOpen" class="folder-content">
        <BookCard v-for="book in books" :key="book.id" :book="book" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
.folder-card
  display: flex
  justify-content: space-between
  align-items: center
  padding: 12px 20px
  background-color: #f8fafc
  border: 1px solid #e2e8f0
  border-radius: 12px

.folder-info
  display: flex
  align-items: center
  gap: 12px
  cursor: pointer
  flex: 1

.folder-actions
  display: flex
  gap: 8px

.folder-content
  padding-left: 20px
  border-left: 2px solid #e2e8f0
  margin-top: 8px
</style>