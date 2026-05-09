<script setup lang="ts">
import sidebar from '../widgets/sidebar.vue';
</script>

<template>
  <div class="layout">
    <sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="sass">
$sidebar-width: 260px
$bg-color: #fdfdfd

.layout
  display: flex
  min-height: 100vh
  background-color: $bg-color

.main-content
  flex: 1
  margin-left: $sidebar-width
  padding: 30px 40px
  transition: all 0.3s ease

@media (max-width: 1024px)
  .main-content
    padding: 20px 24px

@media (max-width: 768px)
  .main-content
    margin-left: 0
    padding: 16px 16px 90px 16px // Большой нижний отступ для мобильного меню
</style>