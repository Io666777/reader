import type { BookDisplayData } from "../../../entities/book/types";
import { apiRequest } from "../../../shared/api/base";

export const getRandomBooks=()=>
    apiRequest<{ book: BookDisplayData[] }>('/books/random')