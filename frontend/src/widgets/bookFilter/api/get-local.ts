import { apiRequest } from "../../../shared/api/base";
import type { MyGenres } from "../types";

export const getLocal = () =>
    apiRequest <MyGenres>('/books/filter')