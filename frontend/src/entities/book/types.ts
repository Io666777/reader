export interface Book {
  id: string;
  authorId: string; 
  bookName: string;
  realiseYear: string;
  image: string;
  isbn: string;
  createdAt: string;
}

export interface Author {
  id: string;
  name: string;
  createdAt: string;
}

// entities/book/types.ts
export interface BookDisplayData {
  id: string;
  isbn: string;
  year: string | undefined;
  bookName?: string;      // Поле из твоей БД
  title?: string;         // Поле из внешнего поиска
  image?: string;         // Поле из твоей БД
  cover?: string | null;  // Поле из внешнего поиска (добавляем сюда)
  realiseYear?: string;
  author: string | { name: string }; // Может быть строкой от API или объектом из БД
}