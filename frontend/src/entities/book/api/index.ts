// src/entities/book/api/index.ts
import { api } from '../../../shared/api/base'

export const fetchBooks = async (searchQuery?: string) => {
  const response = await api.get('/', {
    params: { q: searchQuery }
  })
  return response.data
}

export const addBook = async (bookData: { isbn: string, title: string, author: string, cover: string, year: number }) => {
  const response = await api.post('/add', bookData)
  return response.data
}