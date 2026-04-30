import { apiRequest } from '../../../shared/api/base';
import type { BookDisplayData } from '../../../entities/book/types';

export const getMyBooks = (query: string) =>
  apiRequest<BookDisplayData[]>(`/books?q=${encodeURIComponent(query)}`);