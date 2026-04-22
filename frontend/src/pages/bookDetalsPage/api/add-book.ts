import type { Detals } from "../types";

export async function addBook(book: Detals){
    const response = await fetch(`http://localhost:3000/api/books/${book.id}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    })

    if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Книга уже на полке');
    }

    return await response.json()
}