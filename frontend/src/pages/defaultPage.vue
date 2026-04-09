<script setup lang="ts">
import sidebar from '../widgets/sidebar.vue';
import baseInput from '../shared/ui/baseInput.vue';
</script>

<template>
  <div class="layout">
    <sidebar />

    <div class="layout__container">
      <header class="header">
        <div class="header__search">
          <baseInput />
        </div>
        <div class="header__actions">
          <button class="filter-btn">Фильтры</button>
        </div>
      </header>

      <main class="main-content"></main>
    </div>
  </div>
</template>

<style scoped lang="sass">
$sidebar-width: 260px
$bg-color: #f8f9fa

.layout
  display: flex
  min-height: 100vh
  background-color: $bg-color

  &__container
    flex: 1
    margin-left: $sidebar-width // Отступ под ширину вынесенного сайдбара
    display: flex
    flex-direction: column

  .header
    height: 80px
    padding: 0 40px
    display: flex
    align-items: center
    justify-content: space-between
    background: rgba($bg-color, 0.9)
    backdrop-filter: blur(10px)
    position: sticky
    top: 0
    z-index: 50

    &__search
      flex: 1
      max-width: 500px

  .main-content
    padding: 20px 40px
</style>
