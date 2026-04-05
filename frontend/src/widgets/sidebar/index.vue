<script setup lang="ts">
import baseButton from '../../shared/ui/button.vue';
</script>

<template>
  <aside class="situation">  <!-- Используем aside вместо div для семантики -->
    <h1>Reader</h1>
    <p class="situation__p">скрась свой досуг</p>
    
    <div class="situation__buttons">
      <baseButton to="/" type="transition">список книг</baseButton>
      <baseButton to="/catalog" type="transition">каталог книг</baseButton>
      <!-- <baseButton to="/catalog" type="transition">каталог книг</baseButton> -->
    </div>
  </aside>
</template>

<style scoped lang="sass">
.situation
  display: flex
  flex-direction: column
  width: 280px
  min-width: 280px
  height: 100vh
  padding: 24px 20px
  border-right: 1px solid #ececec
  gap: 20px
  position: sticky
  top: 0
  left: 0
  background: white
  z-index: 10

  h1
    margin: 0
    font-size: 28px
    font-weight: 700

  &__p
    margin: 0
    padding-bottom: 16px
    color: #666
    font-size: 14px
    border-bottom: 1px solid #ececec

  &__buttons
    display: flex
    flex-direction: column
    gap: 12px

    :deep(button)
      width: 100%
      justify-content: center
</style>