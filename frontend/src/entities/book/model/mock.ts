import type { Book, Folder } from './types'

export const MOCK_FOLDERS: Folder[] = [
  { id: 'f1', name: 'Художественная литература', createdAt: Date.now() },
  { id: 'f2', name: 'Техническая документация', createdAt: Date.now() }
]

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    fileUrl: '',
    fileType: 'fb2',
    fileSize: '840 KB',
    folderId: 'f1', // лежит в папке "Художественная литература"
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Чистый код',
    author: 'Роберт Мартин',
    fileUrl: '',
    fileType: 'docx',
    fileSize: '2.4 MB',
    folderId: 'f2', // лежит в папке "Техническая документация"
    createdAt: Date.now()
  },
  {
    id: '3',
    title: 'Заметки на полях',
    author: 'Иван Иванов',
    fileUrl: '',
    fileType: 'txt',
    fileSize: '12 KB',
    folderId: null, // без папки
    createdAt: Date.now()
  }
]