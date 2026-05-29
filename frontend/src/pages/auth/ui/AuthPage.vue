<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SignIn, SignUp } from '@clerk/vue'

const route = useRoute()
</script>

<template>
  <div class="pageContainer">
    <div class="componentContainer">
      <SignUp v-if="route.path.includes('sign-up')" routing="path" path="/auth/sign-up" />
      <SignIn v-else routing="path" path="/auth" />
    </div>
  </div>
</template>

<style scoped lang="sass">
.pageContainer
  display: flex
  flex: 1 1 auto
  width: 100%
  min-height: 100vh
  overflow-y: auto
  justify-content: center
  align-items: flex-start
  // Умный отступ сверху: на мобильных он меньше, на десктопах фиксируется на 5rem (80px)
  padding-top: clamp(2rem, 10vw, 5rem) 
  background-color: #f9fafb // Если хочешь чистый белый Clerk, замени на #ffffff

.componentContainer
  display: flex
  justify-content: center
  width: 100%
  max-width: 100%
</style>