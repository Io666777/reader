<script setup lang="ts">
import { MOCK_BOOKS, MOCK_FOLDERS } from "@/entities/book/model/mock";
import BookCard from "@/entities/book/ui/BookCard.vue";
import FolderCard from "@/entities/book/ui/FolderCard.vue";

// Функция для получения массива книг конкретной папки
const getBooksInFolder = (folderId: string) => {
  return MOCK_BOOKS.filter((book) => book.folderId === folderId);
};

// Книги без папки
const rootBooks = MOCK_BOOKS.filter((book) => book.folderId === null);
</script>

<template>
  <div class="home-page">
    
    <section class="section">
      <h2 class="section-title">Папки</h2>
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
      <h2 class="section-title">Книги</h2>
      <div class="books-paper">
        <BookCard v-for="book in rootBooks" :key="book.id" :book="book" />
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

.section-title
  font-size: 13px
  font-weight: 700
  text-transform: uppercase
  letter-spacing: 0.05em
  color: #94a3b8
  margin: 0

.folders-grid
  display: flex
  flex-direction: column
  gap: 10px

.books-paper
  display: flex
  flex-direction: column
  border-top: 1px solid #e2e8f0 // Верхняя черта, от которой пойдут карточки книг
</style>
