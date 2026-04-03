<script setup lang="ts">
import { ref, reactive } from 'vue'
import bookLibrary from '../../widgets/book/bookCatalog.vue'
import baseButton from '../../shared/ui/button.vue'

const searchQuery = ref('')
const showFilters = ref(false)

// Группируем данные фильтров в один объект
const filters = reactive({
    genre: 'Все',
    year: 'Все',
    priceFrom: null,
    priceTo: null
})

const applyFilters = () => {
    console.log('Применяем фильтры:', filters)
    showFilters.value = false
}

const resetFilters = () => {
    filters.genre = 'Все'
    filters.year = 'Все'
    filters.priceFrom = null
    filters.priceTo = null
    showFilters.value = false
}
</script>

<template>
    <div class="search-page">
        <header class="search-header">
            <div class="search-input-wrapper">
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="введите название книги"
                    class="search-input"
                />
            </div>
            <baseButton @click="showFilters = true" type="transition">
                Фильтры
            </baseButton>
        </header>

        <Teleport to="body">
            <Transition name="fade">
                <div v-if="showFilters" class="filters-modal" @click.self="showFilters = false">
                    <div class="filters-content">
                        <h3>Параметры поиска</h3>
                        
                        <div class="filter-group">
                            <label>Жанр</label>
                            <select v-model="filters.genre" class="filter-select">
                                <option>Все</option>
                                <option>Роман</option>
                                <option>Детектив</option>
                                <option>Фантастика</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label>Год издания</label>
                            <select v-model="filters.year" class="filter-select">
                                <option>Все</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label>Цена (₽)</label>
                            <div class="price-range">
                                <input v-model.number="filters.priceFrom" type="number" placeholder="от" class="price-input" />
                                <span class="divider">-</span>
                                <input v-model.number="filters.priceTo" type="number" placeholder="до" class="price-input" />
                            </div>
                        </div>

                        <div class="filter-actions">
                            <baseButton type="add" size="medium" @click="applyFilters">
                                Применить
                            </baseButton>
                            <baseButton type="transition" size="medium" @click="resetFilters">
                                Сбросить
                            </baseButton>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <bookLibrary :search-query="searchQuery" :filters="filters" />
    </div>
</template>

<style lang="sass" scoped>
.search-page
    padding: 20px
    background: #f8f9fa
    min-height: 100vh

.search-header
    display: flex
    gap: 12px
    margin-bottom: 32px
    align-items: center
    max-width: 800px

.search-input
    width: 100%
    padding: 12px 20px
    border: 1px solid #ddd
    border-radius: 12px
    font-size: 16px
    outline: none
    transition: border-color 0.2s
    &:focus
        border-color: #2196f3

// Стили модалки
.filters-modal
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.4)
    backdrop-filter: blur(4px)
    display: flex
    align-items: center
    justify-content: center
    z-index: 9999

.filters-content
    background: white
    padding: 30px
    border-radius: 20px
    width: 100%
    max-width: 400px
    box-shadow: 0 20px 40px rgba(0,0,0,0.1)

    h3
        margin: 0 0 24px
        font-size: 22px

.filter-group
    margin-bottom: 20px
    label
        display: block
        margin-bottom: 8px
        font-weight: 600
        font-size: 14px

.filter-select, .price-input
    width: 100%
    padding: 12px
    border: 1px solid #eee
    border-radius: 10px
    background: #fdfdfd

.price-range
    display: flex
    gap: 10px
    align-items: center
    .divider
        color: #ccc

.filter-actions
    display: flex
    gap: 12px
    margin-top: 30px
    // Растягиваем кнопки baseButton на всю ширину
    & > *
        flex: 1

// Анимация появления
.fade-enter-active, .fade-leave-active
    transition: opacity 0.3s ease
.fade-enter-from, .fade-leave-to
    opacity: 0
</style>