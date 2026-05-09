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

export const formatExternalBook = (item: any) => {
  const info = item.volumeInfo || {};
  const id = item.id;

  const rawImage = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null;
  const authorName = info.authors ? info.authors.join(', ') : 'Неизвестный автор';

  const safeImage = rawImage 
    ? rawImage.replace('http://', 'https://').replace('&edge=curl', '') 
    : null;

  return {
    id: item.id,
    title: info.title || 'Без названия',
    author: authorName,
    description: info.description || '',
    image: safeImage,
    cover: safeImage, // Добавьте это, чтобы карточка увидела обложку
    realiseYear: info.publishedDate ? info.publishedDate.substring(0, 4) : '0',
    year: info.publishedDate ? info.publishedDate.substring(0, 4) : '0', // Для поля book.year
    rating: info.averageRating ? Number(info.averageRating.toFixed(1)) : 0,
    genres: info.categories ? info.categories.slice(0, 3) : [],
    isExternal: true
  };
};

// Преобразование входящих данных (с фронта или API) в формат, понятный для Prisma
// backend/src/utils/formatters.ts

export const prepareBookInput = (body: any) => {
  const isGoogle = !!body.volumeInfo;
  const info = isGoogle ? body.volumeInfo : body;

  // Ищем картинку везде, где она может быть
  const rawImage = info.imageLinks?.thumbnail || 
                   info.imageLinks?.smallThumbnail || 
                   body.image || 
                   body.cover || 
                   null;

  return {
    id: body.id?.toString() || "", 
    title: info.title || info.bookName || "Без названия",
    authorName: Array.isArray(info.authors) ? info.authors[0] : (info.author || "Неизвестный автор"),
    // ОЧЕНЬ ВАЖНО: называем поле image, чтобы Prisma его поняла
    image: rawImage ? rawImage.replace('http://', 'https://') : null,
    description: info.description || "",
    genresList: info.categories || info.genres || [],
    realiseYear: info.publishedDate ? info.publishedDate.substring(0, 4) : (info.realiseYear || "0")
  };
};