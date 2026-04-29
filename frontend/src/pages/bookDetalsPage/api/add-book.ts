import { apiRequest } from "../../../shared/api/base";
import type { Detals } from "../types";

export const addBook = (book:Detals)=>
    apiRequest(`/books/${book.id}`,{
        method: 'POST',
        body: JSON.stringify(book)
    })