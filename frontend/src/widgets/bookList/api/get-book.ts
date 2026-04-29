import { apiRequest } from '../../../shared/api/base';
import type { BookDisplayData } from '../../../entities/book/types';

export const getBooks = () =>apiRequest<BookDisplayData[]>('/books')