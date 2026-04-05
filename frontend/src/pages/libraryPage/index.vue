<script setup lang="ts">
import { ref } from 'vue'
import bookCatalog from '../../widgets/book/bookCatalog.vue'
import baseInput from '../../shared/ui/input.vue'
import baseButton from '../../shared/ui/button.vue'

// Состояние поиска
const searchQuery = ref('')

// Если на этой странице тоже нужны фильтры, можно добавить reactive объект, 
// как в предыдущем примере. Если нет — оставляем только поиск.
</script>

<template>
  <div class="library-page">
    <header class="library-header">
      <div class="search-wrapper">
        <baseInput 
          v-model="searchQuery" 
          placeholder="Поиск в моей библиотеке..." 
        />
      </div>
      
      <baseButton type="transition">
        Сортировка
      </baseButton>
    </header>

    <main class="library-content">
      <bookCatalog :search-query="searchQuery" />
    </main>
  </div>
</template>

<style lang="sass" scoped>
.library-page
  padding: 20px
  background: #f8f9fa
  min-height: 100vh

.library-header
  display: flex
  gap: 12px
  margin-bottom: 32px
  align-items: center
  max-width: 800px

.search-wrapper
  flex: 1

.library-content
  // Здесь будет отображаться сетка карточек из bookCatalog
  width: 100%
</style>