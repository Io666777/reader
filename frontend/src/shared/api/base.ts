export const API_URL = 'http://localhost:3000/api';

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T>{
   const headers: Record<string, string> = {
    'Content-Type': 'application/json',
   }

   if(options?.headers){
    Object.assign(headers, options.headers)
   }

   const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: headers
   })

   if(!response.ok){
    const errorData = await response.json().catch(()=>({}))
    throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
   }
   return response.json();
}