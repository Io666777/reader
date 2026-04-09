<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <span class="logo-icon">📚</span>
      <h1 class="logo-text">Reader</h1>
    </div>

    <nav class="sidebar__nav">
      <a href="#" class="nav-item active">
        <span class="nav-item__icon">🏠</span>
        Моя полка
      </a>
      <a href="#" class="nav-item">
        <span class="nav-item__icon">🔍</span>
        Поиск книг
      </a>
      <a href="#" class="nav-item">
        <span class="nav-item__icon">📑</span>
        Закладки
      </a>
    </nav>

    <div class="sidebar__footer">
      <div class="user-profile">
        <div class="user-avatar">KF</div>
        <div class="user-info">
          <span class="user-name">KalinkinFiz</span>
          <span class="user-status">Online</span>
        </div>
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
</style>