import { apiRequest } from '../../../shared/api/base';
import type { BookDisplayData } from '../../../entities/book/types';

export const getBySerch = (query: string) =>
  apiRequest<BookDisplayData[]>(`/books/search?title=${encodeURIComponent(query)}`);