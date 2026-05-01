import { apiRequest } from "../../../shared/api/base";

export const getGlobal = () =>
    apiRequest <{genres: string[]}>('/books/genres/all')