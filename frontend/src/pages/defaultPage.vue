<script setup lang="ts">
import sidebar from '../widgets/sidebar/index.vue';
</script>

<template>
  <div class="layout-wrapper">
    <aside class="layout-sidebar">
      <sidebar />
    </aside>

    <main class="layout-main">
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style lang="sass" scoped>
.layout-wrapper
    display: grid
    // Фиксированный сайдбар и гибкий контент
    grid-template-columns: 280px 1fr
    min-height: 100vh
    background-color: #f8f9fa

.layout-sidebar
    position: sticky
    top: 0
    height: 100vh
    border-right: 1px solid #e9ecef
    background: #fff
    z-index: 100

.layout-main
    display: flex
    flex-direction: column
    width: 100%
    min-width: 0 // Важно для предотвращения "раздувания" грида контентом

.container
    flex: 1
    width: 100%
    max-width: 1440px // Не дает контенту слишком сильно растягиваться
    margin: 0 auto   // Центрируем контент
    padding: 32px 40px

    @media (max-width: 1024px)
        padding: 24px

    @media (max-width: 768px)
        padding: 16px

// Базовая анимация появления страниц
.fade-enter-active,
.fade-leave-active
    transition: opacity 0.2s ease

.fade-enter-from,
.fade-leave-to
    opacity: 0

// Адаптив для мобилок (скрываем сайдбар или меняем сетку)
@media (max-width: 768px)
    .layout-wrapper
        grid-template-columns: 1fr // Сайдбар превратится в бургер (нужна доп. логика)
    
    .layout-sidebar
        display: none // Временно скрываем, если нет логики мобильного меню
</style>