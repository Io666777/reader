import axios from 'axios';
import type { BookDisplayData } from '../types';

export async function getBooks() {
  const response = await axios.get<BookDisplayData[]>('http://localhost:3000/book/');
  return response.data;
}