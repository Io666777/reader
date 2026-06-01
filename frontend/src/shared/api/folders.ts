import { apiRequest } from './base'
import type { Folder } from '@/entities/book'

interface ApiResponse<T> { success: boolean; data: T }

export const createFoldersApi = (getToken: () => Promise<string | null>) => ({
  getAll: () =>
    apiRequest<ApiResponse<Folder[]>>('/folders', getToken),

  create: (data: { name: string }) =>
    apiRequest<ApiResponse<Folder>>('/folders', getToken, { method: 'POST', body: data }),

  update: (id: string, data: { name: string }) =>
    apiRequest<ApiResponse<Folder>>(`/folders/${id}`, getToken, { method: 'PUT', body: data }),

  remove: (id: string) =>
    apiRequest<ApiResponse<Folder>>(`/folders/${id}`, getToken, { method: 'DELETE' }),
})
