<script setup lang="ts">
import { ref, computed } from "vue";
import type { Book } from "../model/types";
import BaseButton from "@/shared/ui/BaseButton.vue";

interface EventBadge { id: string; title: string; dueDate: string }

const props = defineProps<{ book: Book; disabled?: boolean; events?: EventBadge[] }>();

const nearestEvent = computed(() =>
  props.events?.length
    ? props.events.reduce((a, b) => a.dueDate < b.dueDate ? a : b)
    : null
)

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru', { day: 'numeric', month: 'short' })
const isExpanded = ref(false);
const emit = defineEmits(["view-activity", "delete", "add-to-folder", "create-event"]);
</script>

<template>
  <div class="book-card" :class="{ expanded: isExpanded }">
    <div class="main-row" @click="isExpanded = !isExpanded">
      <div class="meta-side">
        <span v-if="book.fileType" class="file-badge">{{ book.fileType.toUpperCase() }}</span>
        <div class="titles">
          <h4 class="title">{{ book.title ?? 'Без названия' }}</h4>
          <p class="author">{{ book.author ?? 'Неизвестный автор' }}</p>
        </div>
      </div>
      <span v-if="nearestEvent" class="event-tag">
        до {{ fmtDate(nearestEvent.dueDate) }}
        <span v-if="(events?.length ?? 0) > 1" class="event-more">+{{ (events?.length ?? 0) - 1 }}</span>
      </span>
    </div>

    <Transition name="fade">
      <div v-if="isExpanded" class="details-panel">
        <a v-if="book.fileUrl" :href="book.fileUrl" target="_blank" class="read-link">
          <BaseButton variant="action">Читать</BaseButton>
        </a>
        <BaseButton variant="action" :disabled="disabled" @click="emit('view-activity', book.id)">
          Активность
        </BaseButton>
        <BaseButton variant="action" :disabled="disabled" @click="emit('add-to-folder', book.id)">
          Назначить папку
        </BaseButton>
        <BaseButton variant="action" :disabled="disabled" @click="emit('create-event', { bookId: book.id, label: book.title ?? 'Книга' })">
          Событие
        </BaseButton>
        <BaseButton variant="danger" :disabled="disabled" @click="emit('delete', book.id)">
          Удалить
        </BaseButton>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
.book-card
  border-bottom: 1px solid #e5e7eb

.main-row
  display: flex
  align-items: center
  padding: 11px 0
  cursor: pointer

.meta-side
  display: flex
  align-items: center
  gap: 10px
  flex: 1

.file-badge
  font-size: 10px
  font-weight: 600
  letter-spacing: 0.04em
  color: #9ca3af
  flex-shrink: 0

.titles
  display: flex
  flex-direction: column
  gap: 2px

.title
  font-size: 14px
  font-weight: 500
  color: #111827
  margin: 0

.author
  font-size: 12px
  color: #9ca3af
  margin: 0

.event-tag
  font-size: 11px
  color: #3b82f6
  white-space: nowrap
  flex-shrink: 0

.event-more
  color: #9ca3af

.details-panel
  padding: 0 0 10px 0
  display: flex
  gap: 6px
  flex-wrap: wrap
  +sm
    gap: 8px
    :deep(.base-btn)
      flex: 1

.read-link
  text-decoration: none
</style>
