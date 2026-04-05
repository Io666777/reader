export interface Book {
  id: string
  bookName: string
  image?: string
  realiseYear?: string
  author?: {
    name: string
  }
}

// Теперь указываем Vue, что в этом массиве будут лежать объекты типа Book
