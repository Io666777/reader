<template>
  <button class="filter-btn">
    <svg 
      class="filter-btn__icon" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 6H20M6 12H18M10 18H14" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round"
      />
    </svg>
    <span class="filter-btn__text">Фильтры</span>
  </button>
</template>

<style scoped lang="sass">
.filter-btn
  display: flex
  align-items: center
  gap: 8px
  padding: 8px 20px
  background: white
  border: 1px solid #e0e0e0
  border-radius: 8px
  font-size: 14px
  font-weight: 500
  color: #333
  cursor: pointer
  transition: all 0.2s ease

  &:hover
    background: #f5f5f5
    border-color: #2196f3
    color: #2196f3

  &:active
    transform: scale(0.98)

  &__icon
    flex-shrink: 0

  &__text
    line-height: 1
</style>