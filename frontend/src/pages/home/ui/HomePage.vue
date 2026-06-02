<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { BookCard, FolderCard } from "@/entities/book";
import { BaseButton, BaseInput, BookSelector, FileUpload } from "@/shared/ui";
import { useFolders, FOLDER_SORT_OPTIONS } from "../model/useFolders";
import { useBooks, BOOK_SORT_OPTIONS } from "../model/useBooks";
import { useHomeEvents } from "../model/useHomeEvents";

const {
  books, isLoading: isBooksLoading, isSubmitting: isBookSubmitting,
  deletingBookId, error: booksError,
  isAddingBook, isFolderMenuOpen, isSortOpen: isBookSortOpen,
  bookSearch, bookName, bookAuthor, bookFileUrl, bookFileType, selectedFolderId,
  activeSorts: bookActiveSorts, filteredBooks,
  fetchBooks, createBook, updateBookFolders, removeBookFromFolder, deleteBook,
  toggleAddBook, toggleSort: toggleBookSort, handleViewActivity,
} = useBooks();

const {
  folders, isLoading: isFoldersLoading, isSubmitting: isFolderSubmitting,
  deletingFolderId, error: foldersError,
  isAddingFolder, isBooksMenuOpen, isSortOpen: isFolderSortOpen,
  folderSearch, folderName, selectedBooksIds, activeSorts: folderActiveSorts,
  filteredFolders, getBooksInFolder,
  fetchFolders, createFolder, deleteFolder, renameFolder,
  toggleAddFolder, toggleSort: toggleFolderSort,
} = useFolders(books);

const router = useRouter()

const { events: homeEvents, fetchEvents: fetchHomeEvents } = useHomeEvents()

const bookEventMap = computed(() => {
  const map = new Map<string, typeof homeEvents.value>()
  homeEvents.value.filter(e => e.bookId).forEach(e => {
    const arr = map.get(e.bookId!) ?? []
    arr.push(e)
    map.set(e.bookId!, arr)
  })
  return map
})

const folderEventMap = computed(() => {
  const map = new Map<string, typeof homeEvents.value>()
  homeEvents.value.filter(e => e.folderId).forEach(e => {
    const arr = map.get(e.folderId!) ?? []
    arr.push(e)
    map.set(e.folderId!, arr)
  })
  return map
})

const handleCreateEvent = (payload: { folderId?: string; bookId?: string; label: string }) => {
  router.push({
    path: '/activity',
    query: {
      create: '1',
      ...(payload.folderId ? { folderId: payload.folderId } : {}),
      ...(payload.bookId ? { bookId: payload.bookId } : {}),
      label: payload.label,
    },
  })
}

onMounted(() => {
  fetchBooks()
  fetchFolders()
  fetchHomeEvents()
})

// Назначение папок книге (multi-select)
const assigningBookId = ref<string | null>(null)
const assigningFolderIds = ref<string[]>([])

const handleAddToFolder = (bookId: string) => {
  assigningBookId.value = bookId
  const book = books.value.find(b => b.id === bookId)
  assigningFolderIds.value = book?.folders.map(f => f.id) ?? []
}

const submitAssignFolder = async () => {
  if (!assigningBookId.value) return
  await updateBookFolders(assigningBookId.value, assigningFolderIds.value)
  assigningBookId.value = null
  assigningFolderIds.value = []
}

// Переименование папки
const editingFolder = ref<{ id: string; name: string } | null>(null)

const handleEditFolder = (id: string) => {
  const folder = folders.value.find(f => f.id === id)
  if (folder) editingFolder.value = { id, name: folder.name }
}

const submitRenameFolder = async () => {
  if (!editingFolder.value) return
  await renameFolder(editingFolder.value.id, editingFolder.value.name)
  editingFolder.value = null
}

const bookSelectorItems = computed(() =>
  books.value.map(b => ({ id: b.id, label: b.title ?? 'Без названия' }))
)
const folderSelectorItems = computed(() =>
  folders.value.map(f => ({ id: f.id, label: f.name }))
)

// FolderSelector больше не нужен — используем BookSelector (checkboxes) для назначения папок

</script>

<template>
  <div class="home-page">
    <!-- Папки -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Папки</h2>
        <BaseInput v-model="folderSearch" placeholder="Поиск папки..." />
        <div class="header-actions">
          <BaseButton
            variant="page"
            :class="{ 'sort-active': folderActiveSorts.length }"
            @click="isFolderSortOpen = !isFolderSortOpen"
          >
            Сортировка{{ folderActiveSorts.length ? ` (${folderActiveSorts.length})` : '' }}
          </BaseButton>
          <BaseButton variant="page" @click="toggleAddFolder">
            {{ isAddingFolder ? "Отмена" : "Добавить папку" }}
          </BaseButton>
        </div>
      </div>

      <p v-if="foldersError" class="error-text">{{ foldersError }}</p>

      <Transition name="fade">
        <div v-if="isFolderSortOpen" class="sort-panel">
          <label
            v-for="opt in FOLDER_SORT_OPTIONS"
            :key="opt.key"
            class="sort-option"
            :class="{ 'sort-option--active': folderActiveSorts.includes(opt.key) }"
          >
            <input
              type="checkbox"
              :checked="folderActiveSorts.includes(opt.key)"
              @change="toggleFolderSort(opt.key)"
            />
            {{ opt.label }}
          </label>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="isAddingFolder" class="add-panel-container">
          <div class="add-panel">
            <BaseInput v-model="folderName" placeholder="Название папки" />
            <BaseButton variant="action" :disabled="!folderName.trim() || isFolderSubmitting" @click="createFolder">Создать</BaseButton>
            <BaseButton variant="action" @click="isBooksMenuOpen = !isBooksMenuOpen">
              {{ selectedBooksIds.length ? `Выбрано: ${selectedBooksIds.length}` : "Выбрать книги" }}
            </BaseButton>
          </div>
          <BookSelector v-if="isBooksMenuOpen" v-model="selectedBooksIds" :items="bookSelectorItems" title="Выбрать книги:" />
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="editingFolder" class="add-panel-container">
          <div class="add-panel">
            <BaseInput v-model="editingFolder.name" placeholder="Новое название" />
            <BaseButton variant="action" :disabled="!editingFolder.name.trim() || isFolderSubmitting" @click="submitRenameFolder">Сохранить</BaseButton>
            <BaseButton variant="page" @click="editingFolder = null">Отмена</BaseButton>
          </div>
        </div>
      </Transition>

      <p v-if="isFoldersLoading" class="loading-text">Загрузка...</p>

      <div class="folders-grid">
        <FolderCard
          v-for="folder in filteredFolders"
          :key="folder.id"
          :folder="folder"
          :books="getBooksInFolder(folder.id)"
          :events="folderEventMap.get(folder.id)"
          :disabled="deletingFolderId === folder.id || isFolderSubmitting"
          @edit-folder="handleEditFolder"
          @remove-folder="deleteFolder"
          @view-activity="handleViewActivity"
          @book-remove="({ bookId, folderId }) => removeBookFromFolder(bookId, folderId)"
          @add-to-folder="handleAddToFolder"
          @create-event="handleCreateEvent"
        />
      </div>
    </section>

    <!-- Книги -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Книги</h2>
        <BaseInput v-model="bookSearch" placeholder="Поиск книги..." />
        <div class="header-actions">
          <BaseButton
            variant="page"
            :class="{ 'sort-active': bookActiveSorts.length }"
            @click="isBookSortOpen = !isBookSortOpen"
          >
            Сортировка{{ bookActiveSorts.length ? ` (${bookActiveSorts.length})` : '' }}
          </BaseButton>
          <BaseButton variant="page" @click="toggleAddBook">
            {{ isAddingBook ? "Отмена" : "Добавить книгу" }}
          </BaseButton>
        </div>
      </div>

      <p v-if="booksError" class="error-text">{{ booksError }}</p>

      <Transition name="fade">
        <div v-if="isBookSortOpen" class="sort-panel">
          <label
            v-for="opt in BOOK_SORT_OPTIONS"
            :key="opt.key"
            class="sort-option"
            :class="{ 'sort-option--active': bookActiveSorts.includes(opt.key) }"
          >
            <input
              type="checkbox"
              :checked="bookActiveSorts.includes(opt.key)"
              @change="toggleBookSort(opt.key)"
            />
            {{ opt.label }}
          </label>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="isAddingBook" class="add-panel-container">
          <div class="add-panel">
            <BaseInput v-model="bookName" placeholder="Название книги" />
            <BaseInput v-model="bookAuthor" placeholder="Автор" />
            <FileUpload v-model="bookFileUrl" :fileType="bookFileType" @update:fileType="bookFileType = $event" />
            <BaseButton variant="action" :disabled="!bookName.trim() || isBookSubmitting" @click="createBook">Добавить</BaseButton>
            <BaseButton variant="action" @click="isFolderMenuOpen = !isFolderMenuOpen">
              {{ selectedFolderId ? "Папка выбрана" : "Выбрать папку" }}
            </BaseButton>
          </div>
          <FolderSelector v-if="isFolderMenuOpen" v-model="selectedFolderId" :items="folderSelectorItems" title="Выбрать папку:" />
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="assigningBookId" class="add-panel-container">
          <div class="add-panel">
            <span class="assign-label">Папки для книги:</span>
            <BaseButton variant="action" @click="submitAssignFolder">Сохранить</BaseButton>
            <BaseButton variant="page" @click="assigningBookId = null">Отмена</BaseButton>
          </div>
          <BookSelector v-model="assigningFolderIds" :items="folderSelectorItems" title="Выбрать папки:" />
        </div>
      </Transition>

      <p v-if="isBooksLoading" class="loading-text">Загрузка...</p>

      <div class="books-paper">
        <BookCard
          v-for="book in filteredBooks"
          :key="book.id"
          :book="book"
          :events="bookEventMap.get(book.id)"
          :disabled="deletingBookId === book.id"
          @view-activity="handleViewActivity"
          @add-to-folder="handleAddToFolder"
          @create-event="handleCreateEvent"
          @delete="deleteBook"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="sass">
.home-page
  max-width: 600px
  margin: 0 auto
  display: flex
  flex-direction: column
  gap: 48px
  +sm
    gap: 36px

.section
  display: flex
  flex-direction: column
  gap: 14px

.section-header
  display: flex
  align-items: center
  gap: 8px
  +sm
    flex-wrap: wrap
    .header-actions
      margin-left: auto
    :deep(.base-input)
      order: 1
      flex-basis: 100%

.section-title
  font-size: 11px
  font-weight: 600
  text-transform: uppercase
  letter-spacing: 0.08em
  color: #9ca3af
  margin: 0
  white-space: nowrap

.header-actions
  display: flex
  gap: 8px
  flex-shrink: 0

.sort-active
  color: #111827 !important

.sort-panel
  display: flex
  flex-wrap: wrap
  gap: 10px
  padding: 4px 0

.sort-option
  display: flex
  align-items: center
  gap: 6px
  font-size: 13px
  color: #6b7280
  cursor: pointer
  user-select: none

  input[type="checkbox"]
    accent-color: #111827
    width: 13px
    height: 13px
    cursor: pointer
    flex-shrink: 0

  &--active
    color: #111827
    font-weight: 500

.add-panel-container
  display: flex
  flex-direction: column
  gap: 8px

.add-panel
  display: flex
  align-items: center
  gap: 8px
  padding: 10px 12px
  border: 1px solid #e5e7eb
  border-radius: 8px
  +sm
    flex-direction: column
    align-items: stretch

.assign-label
  font-size: 13px
  color: #6b7280
  white-space: nowrap

.error-text
  font-size: 13px
  color: #ef4444
  margin: 0

.loading-text
  font-size: 13px
  color: #9ca3af
  margin: 0

.books-paper
  display: flex
  flex-direction: column
  border-top: 1px solid #e5e7eb

.folders-grid
  display: flex
  flex-direction: column
  gap: 8px
</style>
