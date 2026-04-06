// src/entities/book/api/index.ts
import { api } from '../../../shared/api/base'

export const fetchBooks = async (searchQuery?: string) => {
  // Добавляем '/book', так как в Hono это основной префикс
  const response = await api.get('/', {
    params: { q: searchQuery }
  })
  return response.data
}

export const addBook = async (bookData: { 
  isbn: string, 
  title: string, 
  author: string, 
  cover: string, 
  year: number 
}) => {
  // Добавляем префикс '/book' перед '/add'
  const response = await api.post('/add', bookData)
  return response.data
}

export const searchExternalBooks = async (title: string) => {
  const res = await api.get('/book/search', { 
    params: { title } 
  });
  return res.data;
};