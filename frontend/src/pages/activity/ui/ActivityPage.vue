<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEvents } from '../model/useEvents'
import { BaseButton, BaseInput } from '@/shared/ui'

const route = useRoute()

const {
  events, isLoading, isSubmitting, error,
  newTitle, newDueDate, newFolderId, newBookId, contextLabel,
  fetchEvents, createEvent, toggleStatus, deleteEvent,
} = useEvents()

onMounted(() => {
  fetchEvents()
  if (route.query.create === '1') {
    newFolderId.value = (route.query.folderId as string) || null
    newBookId.value = (route.query.bookId as string) || null
    contextLabel.value = (route.query.label as string) || null
  }
})

const today = new Date()
today.setHours(0, 0, 0, 0)

const days = computed(() => {
  return Array.from({ length: 21 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]
    const dayEvents = events.value.filter(e => e.dueDate.startsWith(dateStr))
    return {
      dateStr,
      num: date.getDate(),
      name: date.toLocaleDateString('ru', { weekday: 'short' }),
      isToday: i === 0,
      hasOverdue: dayEvents.some(e => e.status === 'pending' && new Date(e.dueDate) < new Date()),
      hasPending: dayEvents.some(e => e.status === 'pending'),
      hasDone: dayEvents.some(e => e.status === 'done'),
    }
  })
})

const overdue = computed(() =>
  events.value.filter(e => {
    const d = new Date(e.dueDate); d.setHours(0, 0, 0, 0)
    return d < today && e.status === 'pending'
  })
)

const upcoming = computed(() =>
  events.value.filter(e => {
    const d = new Date(e.dueDate); d.setHours(0, 0, 0, 0)
    return d >= today && e.status === 'pending'
  })
)

const done = computed(() => events.value.filter(e => e.status === 'done'))

const isCreating = computed(() => route.query.create === '1' || newFolderId.value || newBookId.value)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru', { day: 'numeric', month: 'short' })
</script>

<template>
  <div class="activity-page">

    <!-- Лента дат -->
    <div class="date-strip-wrap">
      <div class="date-strip">
        <div
          v-for="day in days"
          :key="day.dateStr"
          class="day-cell"
          :class="{ 'day-cell--today': day.isToday }"
        >
          <span class="day-name">{{ day.name }}</span>
          <span class="day-num">{{ day.num }}</span>
          <div class="day-dots">
            <span v-if="day.hasOverdue" class="dot dot--red" />
            <span v-else-if="day.hasPending" class="dot dot--blue" />
            <span v-if="day.hasDone" class="dot dot--green" />
          </div>
        </div>
      </div>
    </div>

    <!-- Форма создания -->
    <div class="create-form">
      <p v-if="contextLabel" class="context-label">
        {{ newFolderId ? 'Папка:' : 'Книга:' }} <strong>{{ contextLabel }}</strong>
      </p>
      <div class="form-row">
        <BaseInput v-model="newTitle" placeholder="Название события" />
        <input v-model="newDueDate" type="date" class="date-input" />
        <BaseButton
          variant="action"
          :disabled="!newTitle.trim() || !newDueDate || isSubmitting"
          @click="createEvent"
        >
          Создать
        </BaseButton>
      </div>
      <p v-if="error" class="error-text">{{ error }}</p>
    </div>

    <p v-if="isLoading" class="muted">Загрузка...</p>

    <!-- Просроченные -->
    <section v-if="overdue.length" class="event-section">
      <h3 class="section-title section-title--red">Просрочено</h3>
      <div class="event-list">
        <div v-for="ev in overdue" :key="ev.id" class="event-row">
          <button class="status-btn" @click="toggleStatus(ev)" />
          <div class="event-body">
            <span class="event-title">{{ ev.title }}</span>
            <div class="event-meta">
              <span class="event-date event-date--red">{{ formatDate(ev.dueDate) }}</span>
              <span v-if="ev.folder" class="event-badge">{{ ev.folder.name }}</span>
              <span v-else-if="ev.book" class="event-badge">{{ ev.book.title ?? 'Книга' }}</span>
            </div>
          </div>
          <BaseButton variant="danger" @click="deleteEvent(ev.id)">Удалить</BaseButton>
        </div>
      </div>
    </section>

    <!-- Предстоящие -->
    <section v-if="upcoming.length" class="event-section">
      <h3 class="section-title">Предстоящие</h3>
      <div class="event-list">
        <div v-for="ev in upcoming" :key="ev.id" class="event-row">
          <button class="status-btn" @click="toggleStatus(ev)" />
          <div class="event-body">
            <span class="event-title">{{ ev.title }}</span>
            <div class="event-meta">
              <span class="event-date">{{ formatDate(ev.dueDate) }}</span>
              <span v-if="ev.folder" class="event-badge">{{ ev.folder.name }}</span>
              <span v-else-if="ev.book" class="event-badge">{{ ev.book.title ?? 'Книга' }}</span>
            </div>
          </div>
          <BaseButton variant="danger" @click="deleteEvent(ev.id)">Удалить</BaseButton>
        </div>
      </div>
    </section>

    <!-- Выполненные -->
    <section v-if="done.length" class="event-section">
      <h3 class="section-title muted">Выполнено</h3>
      <div class="event-list">
        <div v-for="ev in done" :key="ev.id" class="event-row event-row--done">
          <button class="status-btn status-btn--done" @click="toggleStatus(ev)" />
          <div class="event-body">
            <span class="event-title">{{ ev.title }}</span>
            <div class="event-meta">
              <span class="event-date">{{ formatDate(ev.dueDate) }}</span>
              <span v-if="ev.folder" class="event-badge">{{ ev.folder.name }}</span>
              <span v-else-if="ev.book" class="event-badge">{{ ev.book.title ?? 'Книга' }}</span>
            </div>
          </div>
          <BaseButton variant="danger" @click="deleteEvent(ev.id)">Удалить</BaseButton>
        </div>
      </div>
    </section>

    <p v-if="!isLoading && !events.length" class="empty-text">Событий пока нет</p>
  </div>
</template>

<style scoped lang="sass">
.activity-page
  max-width: 600px
  margin: 0 auto
  display: flex
  flex-direction: column
  gap: 28px

.date-strip-wrap
  overflow-x: auto
  -webkit-overflow-scrolling: touch
  padding-bottom: 4px

.date-strip
  display: flex
  gap: 6px
  min-width: max-content

.day-cell
  display: flex
  flex-direction: column
  align-items: center
  gap: 4px
  padding: 8px 6px
  border-radius: 8px
  border: 1px solid #e5e7eb
  min-width: 44px

  &--today
    border-color: #111827

.day-name
  font-size: 10px
  color: #9ca3af
  text-transform: capitalize

.day-num
  font-size: 14px
  font-weight: 600
  color: #111827

.day-dots
  display: flex
  gap: 3px
  min-height: 8px

.dot
  width: 6px
  height: 6px
  border-radius: 50%

  &--red
    background: #ef4444

  &--blue
    background: #3b82f6

  &--green
    background: #22c55e

.create-form
  display: flex
  flex-direction: column
  gap: 8px

.form-row
  display: flex
  gap: 8px
  align-items: center
  +sm
    flex-direction: column
    align-items: stretch

.date-input
  padding: 6px 10px
  border: 1px solid #e5e7eb
  border-radius: 6px
  font-size: 13px
  outline: none
  background: #fff
  color: #111827
  cursor: pointer
  flex-shrink: 0

.context-label
  font-size: 13px
  color: #6b7280
  margin: 0

.event-section
  display: flex
  flex-direction: column
  gap: 8px

.section-title
  font-size: 11px
  font-weight: 600
  text-transform: uppercase
  letter-spacing: 0.08em
  color: #9ca3af
  margin: 0

  &--red
    color: #ef4444

.event-list
  display: flex
  flex-direction: column
  border-top: 1px solid #e5e7eb

.event-row
  display: flex
  align-items: center
  gap: 12px
  padding: 10px 0
  border-bottom: 1px solid #e5e7eb

  &--done
    opacity: 0.5

.status-btn
  width: 18px
  height: 18px
  border-radius: 50%
  border: 1.5px solid #d1d5db
  background: #fff
  cursor: pointer
  flex-shrink: 0
  padding: 0

  &--done
    background: #22c55e
    border-color: #22c55e

.event-body
  flex: 1
  display: flex
  flex-direction: column
  gap: 2px
  min-width: 0

.event-title
  font-size: 14px
  font-weight: 500
  color: #111827
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.event-meta
  display: flex
  align-items: center
  gap: 6px
  flex-wrap: wrap

.event-date
  font-size: 12px
  color: #9ca3af

  &--red
    color: #ef4444

.event-badge
  font-size: 11px
  color: #6b7280
  background: #f3f4f6
  border-radius: 4px
  padding: 1px 6px

.error-text
  font-size: 13px
  color: #ef4444
  margin: 0

.muted
  color: #9ca3af

.empty-text
  font-size: 13px
  color: #9ca3af
  text-align: center
  padding: 24px 0
</style>
