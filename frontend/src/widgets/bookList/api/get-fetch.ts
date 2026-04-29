import type { ParamBooks } from "../types";

export const getFetchBook = async(params: ParamBooks)=>{
    try{
        const queryParams = new URLSearchParams()

        if (params.q) queryParams.append('q', params.q);
        if (params.genre) queryParams.append('genre', params.genre);
        if (params.year) queryParams.append('year', params.year);

        const response = await fetch(`/api/books?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке книг');
        }
        return await response.json()
    }catch(error){
        console.error("API Error:", error);
        throw error;
    }
}