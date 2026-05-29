<script setup lang="ts">
import { ref } from "vue";
import { MOCK_BOOKS, MOCK_FOLDERS } from "@/entities/book/model/mock";
import BookCard from "@/entities/book/ui/BookCard.vue";
import FolderCard from "@/entities/book/ui/FolderCard.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import BaseInput from "@/shared/ui/BaseInput.vue";
import FolderSelector from "@/shared/ui/FolderSelector.vue";
import BookSelector from "@/shared/ui/BookSelector.vue";

// Состояния для панелей
const isAddingFolder = ref(false);
const isAddingBook = ref(false);
const isFolderMenuOpen = ref(false);
const isBooksMenuOpen = ref(false);

// Данные форм
const folderName = ref("");
const bookName = ref("");
const bookAuthor = ref("");
const selectedFolderId = ref<string | null>(null);
const selectedBooksIds = ref<string[]>([]);

// Методы переключения
const toggleAddFolder = () => (isAddingFolder.value = !isAddingFolder.value);
const toggleAddBook = () => (isAddingBook.value = !isAddingBook.value);

// Методы бизнес-логики (вызываются при событиях из дочерних компонентов)
const handleViewActivity = (id: string) => {
  console.log("Просмотр активности для книги:", id);
};

const handleDeleteBook = (id: string) => {
  console.log("Удаление книги:", id);
  // Здесь будет логика фильтрации MOCK_BOOKS
};

const getBooksInFolder = (folderId: string) => MOCK_BOOKS.filter((b) => b.folderId === folderId);
const rootBooks = MOCK_BOOKS.filter((b) => b.folderId === null);
</script>

<template>
  <div class="home-page">
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Папки</h2>
        <BaseButton variant="page" @click="toggleAddFolder">
          {{ isAddingFolder ? "Отмена" : "Добавить папку" }}
        </BaseButton>
      </div>

      <Transition name="fade">
        <div v-if="isAddingFolder" class="add-panel-container">
          <div class="add-panel">
            <BaseInput v-model="folderName" placeholder="Название папки" />
            <BaseButton variant="action">Создать</BaseButton>
            <BaseButton variant="action" @click="isBooksMenuOpen = !isBooksMenuOpen">
              {{ selectedBooksIds.length ? `Выбрано: ${selectedBooksIds.length}` : 'Выбрать книги' }}
            </BaseButton>
          </div>
          <BookSelector v-if="isBooksMenuOpen" v-model="selectedBooksIds" />
        </div>
      </Transition>

      <div class="folders-grid">
        <FolderCard
          v-for="folder in MOCK_FOLDERS"
          :key="folder.id"
          :folder="folder"
          :books="getBooksInFolder(folder.id)"
        />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Книги</h2>
        <BaseButton variant="page" @click="toggleAddBook">
          {{ isAddingBook ? "Отмена" : "Добавить книгу" }}
        </BaseButton>
      </div>

      <Transition name="fade">
        <div v-if="isAddingBook" class="add-panel-container">
          <div class="add-panel">
            <BaseInput v-model="bookName" placeholder="Название книги" />
            <BaseInput v-model="bookAuthor" placeholder="Автор" />
            <BaseButton variant="action">Добавить</BaseButton>
            <BaseButton variant="action" @click="isFolderMenuOpen = !isFolderMenuOpen">
              {{ selectedFolderId ? 'Папка выбрана' : 'Выбрать папку' }}
            </BaseButton>
          </div>
          <FolderSelector v-if="isFolderMenuOpen" v-model="selectedFolderId" />
        </div>
      </Transition>

      <div class="books-paper">
        <BookCard 
          v-for="book in rootBooks" 
          :key="book.id" 
          :book="book" 
          @view-activity="handleViewActivity"
          @delete="handleDeleteBook"
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
  justify-content: space-between

.section-title
  font-size: 13px
  font-weight: 700
  text-transform: uppercase
  letter-spacing: 0.05em
  color: #94a3b8
  margin: 0
  line-height: 30px

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

.books-paper
  display: flex
  flex-direction: column
  border-top: 1px solid #e2e8f0

.folders-grid
  display: flex
  flex-direction: column
  gap: 20px
</style>