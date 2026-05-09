<script setup lang="ts">
import { authStore } from '../shared/store/auth';

// Получаем инициалы для аватарки (например, Dmitry -> D)
const getInitials = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : 'U';
};

</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <span class="logo-icon">📚</span>
      <h1 class="logo-text">Reader</h1>
    </div>

    <nav class="sidebar__nav">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="nav-item__icon">🏠</span>
        <span class="nav-item__text">Моя полка</span>
      </router-link>
      <router-link to="/catalog" class="nav-item" active-class="active">
        <span class="nav-item__icon">🔍</span>
        <span class="nav-item__text">Поиск книг</span>
      </router-link>
    </nav>

    <div class="sidebar__footer" v-if="authStore.isAuth.value">
      <div class="user-profile">
        <div class="user-avatar">
          {{ getInitials(authStore.user.value?.username) }}
        </div>
        <div class="user-info">
          <span class="user-name">
            {{ authStore.user.value?.username || 'Пользователь' }}
          </span>
          <span class="user-status">Online</span>
        </div>
        <button @click="authStore.logout()" class="logout-btn" title="Выйти">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="sass">
// Переменные
$sidebar-width: 260px

$text-dark: #2c3e50
$text-gray: #666
$bg-hover: rgba(33, 150, 243, 0.08)

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

  &__logo
    padding: 32px 24px
    display: flex
    align-items: center
    gap: 12px
    
    .logo-icon
      font-size: 26px
    
    .logo-text
      font-size: 22px
      font-weight: 800
      color: $text-dark
      letter-spacing: -0.5px
      margin: 0

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

      &__icon
        font-size: 18px

      &:hover
        background-color: $bg-hover
      &.active  
        .nav-item__icon
          filter: brightness(1.2)

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

      .user-avatar
        min-width: 40px
        height: 40px
        background: #e3f2fd
        border-radius: 12px
        display: flex
        align-items: center
        justify-content: center
        font-weight: 700
        font-size: 14px

      .user-info
        display: flex
        flex-direction: column
        flex: 1
        overflow: hidden

        .user-name
          font-size: 14px
          font-weight: 700
          color: $text-dark
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis

        .user-status
          font-size: 11px
          color: #4caf50
          font-weight: 500
          display: flex
          align-items: center
          gap: 4px
          
          &::before
            content: ''
            width: 6px
            height: 6px
            background: #4caf50
            border-radius: 50%

      .logout-btn
        background: none
        border: none
        padding: 8px
        color: #b0bec5
        cursor: pointer
        transition: all 0.2s
        display: flex
        align-items: center
        border-radius: 8px

        &:hover
          color: #ff5252
          background: rgba(255, 82, 82, 0.1)
</style>