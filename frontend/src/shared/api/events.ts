import { apiRequest } from './base'
import type { UserEvent } from '@/entities/event'

interface ApiResponse<T> { success: boolean; data: T }

interface CreateEventDto {
  title: string
  startDate?: string
  dueDate: string
  folderId?: string
  bookId?: string
}

interface UpdateEventDto {
  title?: string
  startDate?: string | null
  dueDate?: string
  status?: 'pending' | 'done'
}

export const createEventsApi = (getToken: () => Promise<string | null>) => ({
  getAll: () =>
    apiRequest<ApiResponse<UserEvent[]>>('/events', getToken),

  create: (data: CreateEventDto) =>
    apiRequest<ApiResponse<UserEvent>>('/events', getToken, { method: 'POST', body: data }),

  update: (id: string, data: UpdateEventDto) =>
    apiRequest<ApiResponse<UserEvent>>(`/events/${id}`, getToken, { method: 'PUT', body: data }),

  remove: (id: string) =>
    apiRequest<ApiResponse<null>>(`/events/${id}`, getToken, { method: 'DELETE' }),
})
