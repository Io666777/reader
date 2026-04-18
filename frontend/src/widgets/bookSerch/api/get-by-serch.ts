// entities/book/api/search-external.ts
import type { BookDisplayData } from '../../../entities/book/types';


export async function getBySerch(query: string): Promise<BookDisplayData[]> {
  if (!query) return [];

  // ВАЖНО: твой бэкенд в методе searchExternal ждет параметр 'title'
  const response = await fetch(`http://localhost:3000/api/books/search?title=${encodeURIComponent(query)}`);
  
  if (!response.ok) throw new Error('Ошибка глобального поиска');

  return await response.json();
}