<script setup lang="ts">
import sidebar from '../widgets/sidebar.vue';
</script>

<template>
  <div class="layout">
    <sidebar />

    <div class="layout__container">
      <main class="main-content">
        <router-view />
      </main>
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
    margin-left: $sidebar-width
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

    &__actions
      display: flex
      align-items: center
      gap: 12px

  .main-content
    padding: 20px 40px
</style>
