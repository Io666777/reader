export interface Folder {
  id: string
  name: string
  createdAt: number
}

export interface Book {
  id: string
  title: string
  author: string
  fileUrl: string
  fileType: 'fb2' | 'docx' | 'txt'
  fileSize?: string
  progress: number
  folderId: string | null
  createdAt: number
}