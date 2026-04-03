<script setup lang="ts">
import sidebar from '../widgets/sidebar/index.vue';
</script>

<template>
  <div class="default-page">
    <sidebar />
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<style lang="sass" scoped>
.default-page
    display: grid
    grid-template-columns: 280px 1fr  // 280px вместо 300px (оптимальнее)
    min-height: 100vh
    background: #f8f9fa  // Легкий фон для контраста
    
.page-content
    padding: 24px 42px  // Отступы вокруг контента
    overflow-x: auto    // Если контент не влезает по ширине
    
    // Адаптация для маленьких экранов
    @media (max-width: 768px)
        padding: 16px
</style>