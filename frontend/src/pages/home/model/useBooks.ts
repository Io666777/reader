import { computed, ref } from 'vue'
import { MOCK_BOOKS } from '@/entities/book'

type BookSortKey = 'title' | 'author' | 'fileType' | 'createdAt'

export const BOOK_SORT_OPTIONS: { key: BookSortKey; label: string }[] = [
  { key: 'title', label: 'По названию' },
  { key: 'author', label: 'По автору' },
  { key: 'fileType', label: 'По типу файла' },
  { key: 'createdAt', label: 'По дате' },
]

export function useBooks() {
  const isAddingBook = ref(false)
  const isFolderMenuOpen = ref(false)
  const isSortOpen = ref(false)
  const bookSearch = ref('')
  const bookFilterType = ref('all')
  const bookName = ref('')
  const bookAuthor = ref('')
  const selectedFolderId = ref<string | null>(null)
  const activeSorts = ref<BookSortKey[]>([])

  const filteredRootBooks = computed(() => {
    let books = MOCK_BOOKS.filter(b => b.folderId === null)

    if (bookSearch.value) {
      books = books.filter(b =>
        b.title.toLowerCase().includes(bookSearch.value.toLowerCase())
      )
    }

    if (bookFilterType.value !== 'all') {
      books = books.filter(b => b.fileType === bookFilterType.value)
    }

    if (activeSorts.value.length) {
      books = [...books].sort((a, b) => {
        for (const key of activeSorts.value) {
          const cmp = String(a[key]).localeCompare(String(b[key]))
          if (cmp !== 0) return cmp
        }
        return 0
      })
    }

    return books
  })

  const toggleAddBook = () => (isAddingBook.value = !isAddingBook.value)

  const toggleSort = (key: BookSortKey) => {
    const idx = activeSorts.value.indexOf(key)
    idx === -1 ? activeSorts.value.push(key) : activeSorts.value.splice(idx, 1)
  }

  const handleViewActivity = (id: string) => {
    console.log('Просмотр активности для книги:', id)
  }

  const handleDeleteBook = (id: string) => {
    console.log('Удаление книги:', id)
  }

  return {
    isAddingBook,
    isFolderMenuOpen,
    isSortOpen,
    bookSearch,
    bookFilterType,
    bookName,
    bookAuthor,
    selectedFolderId,
    activeSorts,
    filteredRootBooks,
    toggleAddBook,
    toggleSort,
    handleViewActivity,
    handleDeleteBook,
  }
}
