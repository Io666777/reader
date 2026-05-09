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
        Моя полка
      </router-link>
      <router-link to="/catalog" class="nav-item" active-class="active">
        <span class="nav-item__icon">🔍</span>
        Поиск книг
      </router-link>
    </nav>

    <div class="sidebar__footer" v-if="authStore.isAuth.value">
      <div class="user-profile">
        <div class="user-avatar">
          {{ getInitials(authStore.user.value?.username) }}
        </div>
        <div class="user-info">
          <span class="user-name">{{
            authStore.user.value?.username || 'Пользователь'
          }}</span>
          <span class="user-status">Online</span>
        </div>
        <button @click="authStore.logout()" class="logout-btn">
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="12" x2="15" y2="12"></line>
            <polyline points="12 9 15 12 12 15"></polyline>
          </svg>
        
        </button>
      </div>
    </div>
  </aside>
</template>
<style scoped lang="sass">
$sidebar-width: 260px
$accent-color: #2196f3
$text-main: #2c3e50

.sidebar
  width: $sidebar-width
  height: 100vh
  background: white
  border-right: 1px solid #eee
  display: flex
  flex-direction: column
  position: fixed
  left: 0
  top: 0
  z-index: 100

  &__logo
    padding: 30px
    display: flex
    align-items: center
    gap: 12px
    .logo-icon
      font-size: 24px
    .logo-text
      font-size: 20px
      font-weight: 800
      color: $text-main
      margin: 0

  &__nav
    flex: 1
    padding: 0 15px
    display: flex
    flex-direction: column
    gap: 8px

    .nav-item
      display: flex
      align-items: center
      gap: 12px
      padding: 12px 15px
      text-decoration: none
      color: #666
      border-radius: 10px
      transition: all 0.2s
      font-weight: 500

      &:hover
        background-color: rgba($accent-color, 0.05)
        color: $accent-color

      &.active
        background-color: $accent-color
        color: white

  &__footer
    padding: 20px
    border-top: 1px solid #eee

    .user-profile
      display: flex
      align-items: center
      gap: 12px

      .user-avatar
        width: 36px
        height: 36px
        background: #f0f2f5
        border-radius: 10px
        display: flex
        align-items: center
        justify-content: center
        font-weight: 600
        font-size: 12px
        color: $accent-color

      .user-info
        display: flex
        flex-direction: column

        .user-name
          font-size: 14px
          font-weight: 600
          color: $text-main

        .user-status
          font-size: 11px
          color: #4caf50
  // ... существующие стили ...

.sidebar__footer
  padding: 20px
  border-top: 1px solid #eee

  .user-profile
    display: flex
    align-items: center
    gap: 12px
    position: relative // для позиционирования кнопки выхода

    .user-avatar
      min-width: 36px // фиксируем ширину, чтобы не сжималась
      height: 36px
      background: #f0f2f5
      border-radius: 10px
      display: flex
      align-items: center
      justify-content: center
      font-weight: 600
      font-size: 14px
      color: $accent-color

    .user-info
      display: flex
      flex-direction: column
      flex: 1 // занимает всё свободное место
      overflow: hidden // чтобы длинные имена не ломали верстку

      .user-name
        font-size: 14px
        font-weight: 600
        color: $text-main
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden

      .user-status
        font-size: 11px
        color: #4caf50

    .logout-btn
      background: none
      border: none
      cursor: pointer
      padding: 5px
      font-size: 16px
      opacity: 0.5
      transition: opacity 0.2s

      &:hover
        opacity: 1
.logout-btn
  display: flex
  align-items: center
  gap: 8px
  background: none
  border: none
  color: #888
  cursor: pointer
  transition: color 0.2s
  padding: 8px

  &:hover
    color: #2196f3 // Иконка поменяет цвет вместе с текстом благодаря stroke="currentColor"

  svg
    flex-shrink: 0
</style>
