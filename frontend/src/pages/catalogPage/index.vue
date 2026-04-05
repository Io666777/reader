<script setup lang="ts">
import { ref, reactive } from 'vue'
import bookLibrary from '../../widgets/book/bookCatalog.vue'
import baseButton from '../../shared/ui/button.vue'
import baseInput from '../../shared/ui/input.vue' // Импортируем новый инпут

const searchQuery = ref('')
const showFilters = ref(false)

const filters = reactive({
    genre: 'Все',
    year: 'Все',
    priceFrom: null,
    priceTo: null
})

const applyFilters = () => {
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
            <baseInput 
                v-model="searchQuery" 
                placeholder="введите название книги" 
            />
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
                            <label>Цена (₽)</label>
                            <div class="price-range">
                                <baseInput 
                                    v-model.number="filters.priceFrom" 
                                    type="number" 
                                    placeholder="от" 
                                />
                                <span class="divider">-</span>
                                <baseInput 
                                    v-model.number="filters.priceTo" 
                                    type="number" 
                                    placeholder="до" 
                                />
                            </div>
                        </div>

                        <div class="filter-actions">
                            <baseButton type="add" @click="applyFilters">Применить</baseButton>
                            <baseButton type="transition" @click="resetFilters">Сбросить</baseButton>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <bookLibrary :search-query="searchQuery" :filters="filters" />
    </div>
</template>

<style lang="sass" scoped>
// Стили стали намного короче!
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
    width: 90%
    max-width: 400px

.filter-group
    margin-bottom: 20px
    label
        display: block
        margin-bottom: 8px
        font-weight: 600
        font-size: 14px

.filter-select
    width: 100%
    padding: 12px
    border: 1px solid #eee
    border-radius: 12px
    background: #fdfdfd

.price-range
    display: flex
    gap: 10px
    align-items: center

.filter-actions
    display: flex
    gap: 12px
    margin-top: 30px
    & > *
        flex: 1

.fade-enter-active, .fade-leave-active
    transition: opacity 0.3s ease
.fade-enter-from, .fade-leave-to
    opacity: 0
</style>