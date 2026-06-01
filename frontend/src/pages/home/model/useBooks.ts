import { computed, ref } from 'vue'
import { useAuth } from '@clerk/vue'
import { createBooksApi } from '@/shared/api/books'
import type { Book } from '@/entities/book'

type BookSortKey = 'title' | 'author' | 'createdAt'

export const BOOK_SORT_OPTIONS: { key: BookSortKey; label: string }[] = [
  { key: 'title', label: 'По названию' },
  { key: 'author', label: 'По автору' },
  { key: 'createdAt', label: 'По дате' },
]

export function useBooks() {
  const { getToken } = useAuth()
  const booksApi = createBooksApi(() => getToken.value())

  const books = ref<Book[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isSubmitting = ref(false)
  const isAddingBook = ref(false)
  const isFolderMenuOpen = ref(false)
  const isSortOpen = ref(false)
  const bookSearch = ref('')
  const bookName = ref('')
  const bookAuthor = ref('')
  const bookFileUrl = ref<string | null>(null)
  const bookFileType = ref<string | null>(null)
  const selectedFolderId = ref<string | null>(null)
  const activeSorts = ref<BookSortKey[]>([])

  const fetchBooks = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await booksApi.getAll()
      books.value = res.data
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const filteredRootBooks = computed(() => {
    let result = books.value.filter(b => b.folders.length === 0)

    if (bookSearch.value) {
      result = result.filter(b =>
        (b.title ?? '').toLowerCase().includes(bookSearch.value.toLowerCase())
      )
    }

    if (activeSorts.value.length) {
      result = [...result].sort((a, b) => {
        for (const key of activeSorts.value) {
          const cmp = String(a[key] ?? '').localeCompare(String(b[key] ?? ''))
          if (cmp !== 0) return cmp
        }
        return 0
      })
    }

    return result
  })

  const createBook = async () => {
    if (!bookName.value.trim() || isSubmitting.value) return
    isSubmitting.value = true
    error.value = null
    try {
      await booksApi.create({
        title: bookName.value,
        author: bookAuthor.value || undefined,
        folderId: selectedFolderId.value || undefined,
        fileUrl: bookFileUrl.value || undefined,
        fileType: bookFileType.value || undefined,
      })
      await fetchBooks()
      bookName.value = ''
      bookAuthor.value = ''
      selectedFolderId.value = null
      bookFileUrl.value = null
      bookFileType.value = null
      isAddingBook.value = false
    } catch (e: any) {
      error.value = e.message
    } finally {
      isSubmitting.value = false
    }
  }

  const deleteBook = async (id: string) => {
    error.value = null
    try {
      await booksApi.remove(id)
      books.value = books.value.filter(b => b.id !== id)
    } catch (e: any) {
      error.value = e.message
    }
  }

  const toggleAddBook = () => (isAddingBook.value = !isAddingBook.value)

  const toggleSort = (key: BookSortKey) => {
    const idx = activeSorts.value.indexOf(key)
    idx === -1 ? activeSorts.value.push(key) : activeSorts.value.splice(idx, 1)
  }

  const handleViewActivity = (id: string) => {
    console.log('view activity:', id)
  }

  return {
    books,
    isLoading,
    isSubmitting,
    error,
    isAddingBook,
    isFolderMenuOpen,
    isSortOpen,
    bookSearch,
    bookName,
    bookAuthor,
    bookFileUrl,
    bookFileType,
    selectedFolderId,
    activeSorts,
    filteredRootBooks,
    fetchBooks,
    createBook,
    deleteBook,
    toggleAddBook,
    toggleSort,
    handleViewActivity,
  }
}
