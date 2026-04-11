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

export interface BookDisplayData extends Book {
  author?: Author;  
}