<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useEvents } from '../model/useEvents'
import { BaseButton, BaseInput } from '@/shared/ui'

const route = useRoute()

const {
  events, isLoading, isSubmitting, error,
  newTitle, newStartDate, newDueDate, newFolderId, newBookId, contextLabel,
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

// Heat map: цвет ячейки зависит от кол-ва событий
const cellColor = (count: number, hasOverdue: boolean): string => {
  if (count === 0) return ''
  const reds   = ['#fee2e2', '#fecaca', '#fca5a5', '#f87171']
  const blues  = ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd']
  return (hasOverdue ? reds : blues)[Math.min(count - 1, 3)]
}

const days = computed(() =>
  Array.from({ length: 21 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]

    const dayEvents = events.value.filter(e => {
      const start = (e.startDate ?? e.dueDate).split('T')[0]
      const end   = e.dueDate.split('T')[0]
      return dateStr >= start && dateStr <= end
    })

    const hasOverdue = dayEvents.some(
      e => e.status === 'pending' && new Date(e.dueDate).setHours(0,0,0,0) < today.getTime()
    )

    return {
      dateStr,
      num: date.getDate(),
      name: date.toLocaleDateString('ru', { weekday: 'short' }),
      isToday: i === 0,
      count: dayEvents.length,
      color: cellColor(dayEvents.length, hasOverdue),
    }
  })
)

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

// Режим ввода дат
type DateMode = 'single' | 'range'
const dateMode = ref<DateMode>('single')

const setDateMode = (mode: DateMode) => {
  dateMode.value = mode
  if (mode === 'single') newStartDate.value = ''
}

// Умные дефолты: незаполненные даты = сегодня / начало
const handleCreate = async () => {
  if (!newTitle.value.trim()) return
  const todayStr = new Date().toISOString().split('T')[0]

  if (dateMode.value === 'range') {
    if (!newStartDate.value) newStartDate.value = todayStr
    if (!newDueDate.value)   newDueDate.value   = newStartDate.value
  } else {
    newStartDate.value = ''
    if (!newDueDate.value) newDueDate.value = todayStr
  }

  await createEvent()
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru', { day: 'numeric', month: 'short' })

const formatRange = (ev: { startDate: string | null; dueDate: string }) =>
  ev.startDate
    ? `${formatDate(ev.startDate)} — ${formatDate(ev.dueDate)}`
    : formatDate(ev.dueDate)
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
          :style="day.color ? { backgroundColor: day.color, borderColor: 'transparent' } : {}"
        >
          <span class="day-name">{{ day.name }}</span>
          <span class="day-num">{{ day.num }}</span>
          <span v-if="day.count" class="day-count">{{ day.count }}</span>
        </div>
      </div>
    </div>

    <!-- Форма создания -->
    <div class="create-form">
      <p v-if="contextLabel" class="context-label">
        {{ newFolderId ? 'Папка:' : 'Книга:' }} <strong>{{ contextLabel }}</strong>
      </p>

      <div class="mode-toggle">
        <button class="mode-btn" :class="{ 'mode-btn--active': dateMode === 'single' }" @click="setDateMode('single')">
          Конкретный день
        </button>
        <button class="mode-btn" :class="{ 'mode-btn--active': dateMode === 'range' }" @click="setDateMode('range')">
          Промежуток
        </button>
      </div>

      <div class="form-row">
        <BaseInput v-model="newTitle" placeholder="Название события" />
        <div class="date-inputs">
          <template v-if="dateMode === 'range'">
            <input v-model="newStartDate" type="date" class="date-input" :max="newDueDate || undefined" />
            <span class="date-sep">—</span>
          </template>
          <input
            v-model="newDueDate"
            type="date"
            class="date-input"
            :min="dateMode === 'range' ? (newStartDate || undefined) : undefined"
          />
        </div>
        <BaseButton variant="action" :disabled="!newTitle.trim() || isSubmitting" @click="handleCreate">
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
              <span class="event-date event-date--red">{{ formatRange(ev) }}</span>
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
              <span class="event-date">{{ formatRange(ev) }}</span>
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
              <span class="event-date">{{ formatRange(ev) }}</span>
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

// Лента дат
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
  gap: 3px
  padding: 8px 6px
  border-radius: 8px
  border: 1px solid #e5e7eb
  min-width: 44px
  transition: background-color 0.2s

  &--today
    border-color: #111827 !important

.day-name
  font-size: 10px
  color: #9ca3af
  text-transform: capitalize

.day-num
  font-size: 14px
  font-weight: 600
  color: #111827

.day-count
  font-size: 10px
  font-weight: 600
  color: #6b7280

// Форма создания
.create-form
  display: flex
  flex-direction: column
  gap: 8px

.mode-toggle
  display: flex
  border: 1px solid #e5e7eb
  border-radius: 6px
  overflow: hidden
  align-self: flex-start

.mode-btn
  padding: 5px 14px
  font-size: 12px
  font-weight: 500
  color: #9ca3af
  background: #fff
  border: none
  cursor: pointer

  &--active
    background: #111827
    color: #fff

.form-row
  display: flex
  gap: 8px
  align-items: center
  +sm
    flex-direction: column
    align-items: stretch

.date-inputs
  display: flex
  align-items: center
  gap: 6px
  flex-shrink: 0

.date-sep
  font-size: 13px
  color: #9ca3af

.date-input
  padding: 6px 10px
  border: 1px solid #e5e7eb
  border-radius: 6px
  font-size: 13px
  outline: none
  background: #fff
  color: #111827
  cursor: pointer

.context-label
  font-size: 13px
  color: #6b7280
  margin: 0

// Секции событий
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
