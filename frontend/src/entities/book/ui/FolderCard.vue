<script setup lang="ts">
import { ref } from "vue";
import type { Folder, Book } from "../model/types";
import BookCard from "./BookCard.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";

const props = defineProps<{
  folder: Folder;
  books: Book[];
  disabled?: boolean;
}>();

// Добавляем события управления папкой
const emit = defineEmits(["view-activity", "book-remove", "remove-folder", "edit-folder", "add-to-folder", "create-event"]);

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
        <BaseButton variant="action" @click="emit('create-event', { folderId: folder.id, label: folder.name })">Событие</BaseButton>
        <BaseButton variant="action" :disabled="disabled" @click="emit('edit-folder', folder.id)">Изменить</BaseButton>
        <BaseButton variant="danger" :disabled="disabled" @click="emit('remove-folder', folder.id)">Удалить</BaseButton>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="isOpen" class="folder-content">
        <BookCard
            v-for="book in books"
            :key="book.id"
            :book="book"
            @view-activity="emit('view-activity', $event)"
            @delete="(bookId) => emit('book-remove', { bookId, folderId: props.folder.id })"
            @add-to-folder="emit('add-to-folder', $event)"
          />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
.folder-card
  display: flex
  justify-content: space-between
  align-items: center
  padding: 11px 14px
  border: 1px solid #e5e7eb
  border-radius: 8px
  +sm
    flex-wrap: wrap
    gap: 8px

.folder-info
  display: flex
  align-items: center
  gap: 10px
  cursor: pointer
  flex: 1

.folder-name
  font-size: 14px
  font-weight: 500
  color: #111827

.count-badge
  font-size: 12px
  color: #9ca3af

.folder-actions
  display: flex
  gap: 6px
  +sm
    width: 100%

.folder-content
  margin-top: 4px
  padding-left: 14px
  border-left: 1px solid #e5e7eb
</style>