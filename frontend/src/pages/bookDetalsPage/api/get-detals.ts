import type { Detals } from "../types";

export async function getDetals(id: string): Promise<Detals>{
    const response = await fetch(`http://localhost:3000/api/books/${id}`)

    if (!response.ok) throw new Error('Ошибка при получении деталей книги');
    const data: Detals = await response.json();
    return data;
}