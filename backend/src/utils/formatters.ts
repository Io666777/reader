export const formatBook = (book:any)=>{
    return{
    id: book.id,
    title: book.bookName, 
    author: book.author?.name || 'Неизвестный автор',
    description: book.description || '',
    image: book.image || '/placeholder.jpg',
    realiseYear: book.realiseYear ? Number(book.realiseYear) : 0,
    rating: book.rating || 0,
    genres: book.genres?.map((g: any) => g.name) || [],
    isbn: book.isbn || '',
    isExternal: false
    }
}

export const formatExternalBook = (id: string, data: any, authorName: string) => {
  return {
    id: id,
    title: data.title,
    author: authorName,
    description: typeof data.description === 'string' 
      ? data.description 
      : data.description?.value || '',
    image: data.covers 
      ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` 
      : null,
    realiseYear: data.first_publish_date || '0',
    rating: 0,
    genres: [],
    isExternal: true
  };
};

// Преобразование входящих данных (с фронта или API) в формат, понятный для Prisma
export const prepareBookInput = (body: any) => {
  return {
    id: body.id as string,
    title: body.title || "Без названия",
    authorName: body.author || "Неизвестный автор",
    image: body.image || null,
    description: body.description || "",
    // Унифицируем поле года (исправляем опечатку фронта здесь)
    realiseYear: body.realiseYear ? String(body.realiseYear) : "",
    genresList: Array.isArray(body.genres) ? (body.genres as string[]) : [],
  };
};