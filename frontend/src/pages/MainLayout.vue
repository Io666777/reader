<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="menu">
    <RouterLink to="/" class="menu-item" :exact-active-class="'active'">
      <span>Главная</span>
    </RouterLink>

    <RouterLink to="/activity" class="menu-item" :exact-active-class="'active'">
      <span>Активность</span>
    </RouterLink>
  </nav>
</template>

<style scoped lang="sass">
.menu
  display: flex
  justify-content: center
  gap: 32px
  width: 100%
  max-width: 500px
  margin: 0 auto
  padding: 0
  background: none

.menu-item
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-decoration: none
  flex: 1
  padding: 12px 0 20px 0
  background: none
  border: none
  
  color: #94a3b8 
  transition: color 0.2s ease



  span
    font-size: 14px
    font-weight: 600
    margin-top: 6px

  &:hover
    color: #64748b

  &.active
    color: #000000 

    &::after
      content: ''
      position: absolute
      bottom: 0
      left: 50%
      transform: translateX(-50%)
      width: 40px
      height: 3px // Толщина линии
      background-color: #000000
      border-radius: 2px
</style>