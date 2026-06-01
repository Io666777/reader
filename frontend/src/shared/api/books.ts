import { apiRequest } from './base'
import type { Book } from '@/entities/book'

interface ApiResponse<T> { success: boolean; data: T }

interface CreateBookDto {
  title: string
  author?: string
  description?: string
  folderId?: string
}

interface UpdateBookDto {
  title?: string
  author?: string
  description?: string
  image?: string
}

export const createBooksApi = (getToken: () => Promise<string | null>) => ({
  getAll: () =>
    apiRequest<ApiResponse<Book[]>>('/books', getToken),

  create: (data: CreateBookDto) =>
    apiRequest<ApiResponse<Book>>('/books', getToken, { method: 'POST', body: data }),

  update: (id: string, data: UpdateBookDto) =>
    apiRequest<ApiResponse<Book>>(`/books/${id}`, getToken, { method: 'PUT', body: data }),

  remove: (id: string) =>
    apiRequest<ApiResponse<Book>>(`/books/${id}`, getToken, { method: 'DELETE' }),
})
