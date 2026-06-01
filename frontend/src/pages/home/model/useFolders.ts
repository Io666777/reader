import { computed, ref, type Ref } from 'vue'
import { useAuth } from '@clerk/vue'
import { createFoldersApi } from '@/shared/api/folders'
import type { Book, Folder } from '@/entities/book'

type FolderSortKey = 'name' | 'createdAt'

export const FOLDER_SORT_OPTIONS: { key: FolderSortKey; label: string }[] = [
  { key: 'name', label: 'По названию' },
  { key: 'createdAt', label: 'По дате' },
]

export function useFolders(books: Ref<Book[]>) {
  const { getToken } = useAuth()
  const foldersApi = createFoldersApi(() => getToken.value())

  const folders = ref<Folder[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isSubmitting = ref(false)
  const isAddingFolder = ref(false)
  const isBooksMenuOpen = ref(false)
  const isSortOpen = ref(false)
  const folderSearch = ref('')
  const folderName = ref('')
  const selectedBooksIds = ref<string[]>([])
  const activeSorts = ref<FolderSortKey[]>([])

  const fetchFolders = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await foldersApi.getAll()
      folders.value = res.data
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const getBooksInFolder = (folderId: string) =>
    books.value.filter(b => b.folders.some(f => f.id === folderId))

  const filteredFolders = computed(() => {
    let result = folders.value.filter(f =>
      f.name.toLowerCase().includes(folderSearch.value.toLowerCase())
    )

    if (activeSorts.value.length) {
      result = [...result].sort((a, b) => {
        for (const key of activeSorts.value) {
          const cmp = String(a[key]).localeCompare(String(b[key]))
          if (cmp !== 0) return cmp
        }
        return 0
      })
    }

    return result
  })

  const createFolder = async () => {
    if (!folderName.value.trim() || isSubmitting.value) return
    isSubmitting.value = true
    error.value = null
    try {
      await foldersApi.create({ name: folderName.value })
      await fetchFolders()
      folderName.value = ''
      isAddingFolder.value = false
    } catch (e: any) {
      error.value = e.message
    } finally {
      isSubmitting.value = false
    }
  }

  const deleteFolder = async (id: string) => {
    error.value = null
    try {
      await foldersApi.remove(id)
      folders.value = folders.value.filter(f => f.id !== id)
    } catch (e: any) {
      error.value = e.message
    }
  }

  const renameFolder = async (id: string, name: string) => {
    if (isSubmitting.value) return
    isSubmitting.value = true
    error.value = null
    try {
      const res = await foldersApi.update(id, { name })
      const idx = folders.value.findIndex(f => f.id === id)
      if (idx !== -1) folders.value[idx] = res.data
    } catch (e: any) {
      error.value = e.message
    } finally {
      isSubmitting.value = false
    }
  }

  const toggleAddFolder = () => (isAddingFolder.value = !isAddingFolder.value)

  const toggleSort = (key: FolderSortKey) => {
    const idx = activeSorts.value.indexOf(key)
    idx === -1 ? activeSorts.value.push(key) : activeSorts.value.splice(idx, 1)
  }

  return {
    folders,
    isLoading,
    isSubmitting,
    error,
    isAddingFolder,
    isBooksMenuOpen,
    isSortOpen,
    folderSearch,
    folderName,
    selectedBooksIds,
    activeSorts,
    filteredFolders,
    getBooksInFolder,
    fetchFolders,
    createFolder,
    deleteFolder,
    renameFolder,
    toggleAddFolder,
    toggleSort,
  }
}
