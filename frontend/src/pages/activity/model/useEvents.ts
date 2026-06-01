import { ref } from 'vue'
import { useAuth } from '@clerk/vue'
import { createEventsApi } from '@/shared/api/events'
import type { UserEvent } from '@/entities/event'

export function useEvents() {
  const { getToken } = useAuth()
  const eventsApi = createEventsApi(() => getToken.value())

  const events = ref<UserEvent[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)

  const newTitle = ref('')
  const newDueDate = ref('')
  const newFolderId = ref<string | null>(null)
  const newBookId = ref<string | null>(null)
  const contextLabel = ref<string | null>(null)

  const fetchEvents = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await eventsApi.getAll()
      events.value = res.data
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const createEvent = async () => {
    if (!newTitle.value.trim() || !newDueDate.value || isSubmitting.value) return
    isSubmitting.value = true
    error.value = null
    try {
      const res = await eventsApi.create({
        title: newTitle.value,
        dueDate: newDueDate.value,
        folderId: newFolderId.value || undefined,
        bookId: newBookId.value || undefined,
      })
      events.value = [...events.value, res.data].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
      newTitle.value = ''
      newDueDate.value = ''
      newFolderId.value = null
      newBookId.value = null
      contextLabel.value = null
    } catch (e: any) {
      error.value = e.message
    } finally {
      isSubmitting.value = false
    }
  }

  const toggleStatus = async (event: UserEvent) => {
    const status = event.status === 'pending' ? 'done' : 'pending'
    try {
      const res = await eventsApi.update(event.id, { status })
      const idx = events.value.findIndex(e => e.id === event.id)
      if (idx !== -1) events.value[idx] = res.data
    } catch (e: any) {
      error.value = e.message
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      await eventsApi.remove(id)
      events.value = events.value.filter(e => e.id !== id)
    } catch (e: any) {
      error.value = e.message
    }
  }

  return {
    events,
    isLoading,
    isSubmitting,
    error,
    newTitle,
    newDueDate,
    newFolderId,
    newBookId,
    contextLabel,
    fetchEvents,
    createEvent,
    toggleStatus,
    deleteEvent,
  }
}
