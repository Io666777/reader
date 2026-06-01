export interface Folder {
  id: string
  name: string
  userId: string
  createdAt: string
}

export interface Book {
  id: string
  title: string | null
  author: string | null
  description: string | null
  image: string | null
  fileUrl: string | null
  fileType: string | null
  createdAt: string
  folders: Folder[]
}
