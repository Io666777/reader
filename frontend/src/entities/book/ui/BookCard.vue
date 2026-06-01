<script setup lang="ts">
import { ref } from "vue";
import type { Book } from "../model/types";
import BaseButton from "@/shared/ui/BaseButton.vue";

defineProps<{ book: Book }>();
const isExpanded = ref(false);
const emit = defineEmits(["view-activity", "delete", "add-to-folder"]);
</script>

<template>
  <div class="book-card" :class="{ expanded: isExpanded }">
    <div class="main-row" @click="isExpanded = !isExpanded">
      <div class="meta-side">
        <span class="file-badge">{{ book.fileType.toUpperCase() }}</span>
        <div class="titles">
          <h4 class="title">{{ book.title }}</h4>
          <p class="author">{{ book.author }}</p>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isExpanded" class="details-panel">
        <BaseButton variant="action" @click="emit('view-activity', book.id)">
          Посмотреть активности
        </BaseButton>
        <BaseButton variant="action" @click="emit('add-to-folder', book.id)">
          Назначить папку
        </BaseButton>
        <BaseButton variant="danger" @click="emit('delete', book.id)">
          Удалить книгу
        </BaseButton>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
.book-card
  border-bottom: 1px solid #e2e8f0
  overflow: hidden
  transition: all 0.3s ease

  &.expanded
    background-color: #f8fafc

.main-row
  display: flex
  align-items: center
  padding: 16px 20px
  cursor: pointer
  width: 100%

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

.details-panel
  padding: 0 20px 16px 60px
  display: flex
  gap: 10px
  width: 100%

.action-btn
  padding: 8px 16px
  border-radius: 8px
  border: 1px solid #e2e8f0
  background: #f9fafb
  font-size: 12px
  font-weight: 600
  cursor: pointer
  transition: all 0.2s

  &.del
    background: #f9fafb
    color: #black
    border: 1px solid #e2e8f0
    margin-left: auto

  &:hover
    opacity: 0.8
</style>
