import { apiRequest } from '../../../shared/api/base';


export const deleteBook = (id: string) =>
    apiRequest(`/books/${id}`, {
        method: 'DELETE'
    });