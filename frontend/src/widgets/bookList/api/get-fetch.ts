import type { BookDisplayData } from "../../../entities/book/types";
import { apiRequest } from "../../../shared/api/base";
import type { ParamBooks } from "../types";

export const getFetchBook = async(params: ParamBooks)=>{
   const query = new URLSearchParams()
   if (params.q) query.append('q', params.q);
   if (params.genre) query.append('genre', params.genre);
   if (params.year) query.append('year', params.year);
   
   return apiRequest<BookDisplayData[]>(`/books?${query.toString()}`);
}