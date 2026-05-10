<script setup lang="ts">
import { authStore } from '../shared/store/auth';

const getInitials = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : 'U';
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <h1 class="logo-text">Reader</h1>
    </div>

    <nav class="sidebar__nav">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="nav-item__text">Моя полка</span>
      </router-link>
      <router-link to="/catalog" class="nav-item" active-class="active">
        <span class="nav-item__text">Поиск книг</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped lang="sass">
$sidebar-width: 260px

$text-dark: #2c3e50
$text-gray: #666
$bg-hover: rgba(33, 150, 243, 0.08)

.logout-btn
  border: none 
  background-color: none
.sidebar
  width: $sidebar-width
  height: 100vh
  background: #ffffff
  border-right: 1px solid #f0f0f0
  display: flex
  flex-direction: column
  position: fixed
  left: 0
  top: 0
  z-index: 100
  transition: all 0.3s ease

  &__logo
    padding: 32px 24px
    display: flex
    align-items: center
    gap: 12px
    .logo-text
      font-size: 22px
      font-weight: 800
      color: $text-dark

  &__nav
    flex: 1
    padding: 0 16px
    display: flex
    flex-direction: column
    gap: 4px
    .nav-item
      display: flex
      align-items: center
      gap: 12px
      padding: 12px 16px
      text-decoration: none
      color: $text-gray
      border-radius: 12px
      transition: all 0.2s ease
      font-weight: 500

  &__footer
    padding: 20px 16px
    border-top: 1px solid #f5f5f5
    .user-profile
      display: flex
      align-items: center
      gap: 12px
      padding: 8px
      background: #fafafa
      border-radius: 16px

@media (max-width: 768px)
  .sidebar
    width: 100%
    height: 70px
    flex-direction: row
    top: auto
    bottom: 0
    border-right: none
    border-top: 1px solid #f0f0f0
    padding: 0

    &__logo, &__footer
      display: none

    &__nav
      flex-direction: row
      padding: 0
      gap: 0
      .nav-item
        flex: 1
        flex-direction: column
        justify-content: center
        border-radius: 0
        gap: 4px
        font-size: 11px
        &.active
          box-shadow: none
          background: none
</style>
