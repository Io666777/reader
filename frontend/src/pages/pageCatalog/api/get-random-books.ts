import type { BookDisplayData } from "../../../entities/book/types";
import { apiRequest } from "../../../shared/api/base";

export const getRandomBooks = (genre?: string | null) => {
    const query = genre ? `?genre=${encodeURIComponent(genre)}` : '';
    
    return apiRequest<{ book: BookDisplayData[] }>(`/books/random${query}`);
};