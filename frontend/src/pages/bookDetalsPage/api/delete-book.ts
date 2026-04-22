export async function deleteBook(id: string){
    const response = await fetch(`http://localhost:3000/api/books/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Ошибка при удалении книги');
    }
    return await response.json();
}