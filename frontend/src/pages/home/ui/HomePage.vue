<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { BookCard, FolderCard } from "@/entities/book";
import { BaseButton, BaseInput, BookSelector, FolderSelector } from "@/shared/ui";
import { useFolders, FOLDER_SORT_OPTIONS } from "../model/useFolders";
import { useBooks, BOOK_SORT_OPTIONS } from "../model/useBooks";

const {
  books, isLoading: isBooksLoading, isSubmitting: isBookSubmitting, error: booksError,
  isAddingBook, isFolderMenuOpen, isSortOpen: isBookSortOpen,
  bookSearch, bookName, bookAuthor, selectedFolderId,
  activeSorts: bookActiveSorts, filteredRootBooks,
  fetchBooks, createBook, deleteBook,
  toggleAddBook, toggleSort: toggleBookSort, handleViewActivity,
} = useBooks();

const {
  folders, isLoading: isFoldersLoading, isSubmitting: isFolderSubmitting, error: foldersError,
  isAddingFolder, isBooksMenuOpen, isSortOpen: isFolderSortOpen,
  folderSearch, folderName, selectedBooksIds, activeSorts: folderActiveSorts,
  filteredFolders, getBooksInFolder,
  fetchFolders, createFolder, deleteFolder, renameFolder,
  toggleAddFolder, toggleSort: toggleFolderSort,
} = useFolders(books);

onMounted(() => {
  fetchBooks()
  fetchFolders()
})

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
          @edit-folder="handleEditFolder"
          @remove-folder="deleteFolder"
          @view-activity="handleViewActivity"
          @delete="deleteBook"
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
            <BaseButton variant="action" :disabled="!bookName.trim() || isBookSubmitting" @click="createBook">Добавить</BaseButton>
            <BaseButton variant="action" @click="isFolderMenuOpen = !isFolderMenuOpen">
              {{ selectedFolderId ? "Папка выбрана" : "Выбрать папку" }}
            </BaseButton>
          </div>
          <FolderSelector v-if="isFolderMenuOpen" v-model="selectedFolderId" :items="folderSelectorItems" title="Выбрать папку:" />
        </div>
      </Transition>

      <p v-if="isBooksLoading" class="loading-text">Загрузка...</p>

      <div class="books-paper">
        <BookCard
          v-for="book in filteredRootBooks"
          :key="book.id"
          :book="book"
          @view-activity="handleViewActivity"
          @delete="deleteBook"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="sass">
.home-page
  max-width: 700px
  margin: 0 auto
  display: flex
  flex-direction: column
  gap: 40px

.section
  display: flex
  flex-direction: column
  gap: 14px

.section-header
  display: flex
  align-items: center
  gap: 10px

.section-title
  font-size: 13px
  font-weight: 700
  text-transform: uppercase
  letter-spacing: 0.05em
  color: #94a3b8
  margin: 0
  white-space: nowrap
  line-height: 30px

.header-actions
  display: flex
  gap: 6px
  flex-shrink: 0

.sort-active
  color: #000000 !important

.sort-panel
  display: flex
  flex-wrap: wrap
  gap: 8px
  padding: 12px 16px
  border: 1px solid #e2e8f0
  border-radius: 12px
  background: #f8fafc

.sort-option
  display: flex
  align-items: center
  gap: 6px
  font-size: 13px
  font-weight: 500
  color: #64748b
  cursor: pointer
  padding: 5px 10px
  border-radius: 6px
  border: 1px solid #e2e8f0
  background: #fff
  transition: all 0.15s ease
  user-select: none

  input[type="checkbox"]
    accent-color: #000
    width: 14px
    height: 14px
    cursor: pointer

  &:hover
    border-color: #cbd5e1

  &--active
    border-color: #000
    color: #000
    background: #f1f5f9

.add-panel-container
  display: flex
  flex-direction: column
  gap: 10px
  margin-bottom: 10px

.add-panel
  display: flex
  justify-content: space-between
  align-items: center
  gap: 10px
  padding: 16px
  border: 1px solid #e2e8f0
  border-radius: 12px

.error-text
  font-size: 13px
  color: #e53e3e
  margin: 0

.loading-text
  font-size: 13px
  color: #94a3b8
  margin: 0

.books-paper
  display: flex
  flex-direction: column
  border-top: 1px solid #e2e8f0

.folders-grid
  display: flex
  flex-direction: column
  gap: 20px
</style>
