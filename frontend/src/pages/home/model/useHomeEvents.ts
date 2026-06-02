import { ref } from 'vue'
import { useAuth } from '@clerk/vue'
import { createEventsApi } from '@/shared/api/events'
import type { UserEvent } from '@/entities/event'

export function useHomeEvents() {
  const { getToken } = useAuth()
  const eventsApi = createEventsApi(() => getToken.value())
  const events = ref<UserEvent[]>([])

  const fetchEvents = async () => {
    try {
      const res = await eventsApi.getAll()
      events.value = res.data.filter(e => e.status === 'pending')
    } catch {}
  }

  return { events, fetchEvents }
}
