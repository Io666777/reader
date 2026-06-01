<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="menu">
    <RouterLink to="/" class="menu-item" :exact-active-class="'active'">
      <span>Полка</span>
    </RouterLink>

    <RouterLink to="/activity" class="menu-item" :exact-active-class="'active'">
      <span>Активность</span>
    </RouterLink>
  </nav>

  <main class="content">
    <RouterView />
  </main>
</template>

<style scoped lang="sass">
.menu
  display: flex
  width: 100%
  max-width: 560px
  margin: 0 auto
  border-bottom: 1px solid #e5e7eb

.menu-item
  position: relative
  display: flex
  align-items: center
  justify-content: center
  text-decoration: none
  flex: 1
  padding: 14px 0
  font-size: 13px
  font-weight: 500
  color: #9ca3af

  span
    font-size: 13px
    font-weight: 500

  &.active
    color: #111827

    &::after
      content: ''
      position: absolute
      bottom: -1px
      left: 50%
      transform: translateX(-50%)
      width: 20px
      height: 2px
      background: #111827
      border-radius: 1px

.content
  flex: 1
  width: 100%
  padding: 28px 20px
  +sm
    padding: 20px 14px
</style>
