<script setup lang="ts">
import { SignIn } from '@clerk/vue'
</script>

<template>
  <div class="clerk-auth-container">
    <SignIn 
      routing="path" 
      path="/auth" 
      sign-up-url="/auth/sign-up"
    />
  </div>
</template>
