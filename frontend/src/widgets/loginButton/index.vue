<template>
  <router-link to="/profil" class="log-btn">
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </router-link>
</template>

<style scoped lang="sass">
.log-btn
  background: white
  border: 1px solid #fafafa
  border-radius: 10px
  padding: 8px
  cursor: pointer
  transition: all 0.2s
  display: flex
  align-items: center
  justify-content: center
</style>
