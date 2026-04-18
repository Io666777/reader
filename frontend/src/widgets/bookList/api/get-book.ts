import axios from 'axios';
import type { BookDisplayData } from '../../../entities/book/types';

export async function getBooks() {
  const response = await axios.get<BookDisplayData[]>('http://localhost:3000/api/books/');
  return response.data;
}