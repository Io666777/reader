import { computed, ref } from 'vue'
import { MOCK_FOLDERS, MOCK_BOOKS } from '@/entities/book'

type FolderSortKey = 'name' | 'bookCount' | 'createdAt'

export const FOLDER_SORT_OPTIONS: { key: FolderSortKey; label: string }[] = [
  { key: 'name', label: 'По названию' },
  { key: 'bookCount', label: 'По кол-ву книг' },
  { key: 'createdAt', label: 'По дате' },
]

export function useFolders() {
  const isAddingFolder = ref(false)
  const isBooksMenuOpen = ref(false)
  const isSortOpen = ref(false)
  const folderSearch = ref('')
  const folderName = ref('')
  const selectedBooksIds = ref<string[]>([])
  const activeSorts = ref<FolderSortKey[]>([])

  const getBooksInFolder = (folderId: string) =>
    MOCK_BOOKS.filter(b => b.folderId === folderId)

  const filteredFolders = computed(() => {
    let folders = MOCK_FOLDERS.filter(f =>
      f.name.toLowerCase().includes(folderSearch.value.toLowerCase())
    )

    if (activeSorts.value.length) {
      folders = [...folders].sort((a, b) => {
        for (const key of activeSorts.value) {
          if (key === 'bookCount') {
            const cmp = getBooksInFolder(b.id).length - getBooksInFolder(a.id).length
            if (cmp !== 0) return cmp
          } else {
            const cmp = String(a[key]).localeCompare(String(b[key]))
            if (cmp !== 0) return cmp
          }
        }
        return 0
      })
    }

    return folders
  })

  const toggleAddFolder = () => (isAddingFolder.value = !isAddingFolder.value)

  const toggleSort = (key: FolderSortKey) => {
    const idx = activeSorts.value.indexOf(key)
    idx === -1 ? activeSorts.value.push(key) : activeSorts.value.splice(idx, 1)
  }

  return {
    isAddingFolder,
    isBooksMenuOpen,
    isSortOpen,
    folderSearch,
    folderName,
    selectedBooksIds,
    activeSorts,
    filteredFolders,
    getBooksInFolder,
    toggleAddFolder,
    toggleSort,
  }
}
