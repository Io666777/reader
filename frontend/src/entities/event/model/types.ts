export interface UserEvent {
  id: string
  title: string
  startDate: string | null
  dueDate: string
  status: 'pending' | 'done'
  folderId: string | null
  bookId: string | null
  createdAt: string
  folder: { id: string; name: string } | null
  book: { id: string; title: string | null } | null
}
