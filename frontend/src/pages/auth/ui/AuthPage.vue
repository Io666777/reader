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
  justify-content: center
  align-items: flex-start
  padding-top: clamp(2rem, 8vw, 4rem)

.componentContainer
  display: flex
  justify-content: center
  width: 100%
</style>