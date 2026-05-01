<script setup lang="ts">
import bookSerch from '../../widgets/bookSerch/index.vue';
import filterForBook from '../../widgets/bookFilter/index.vue';
</script>

<template>
  <div class="cont">
    <filterForBook mode="global" /> <bookSerch mode="global" />
  </div>
</template>

<style scoped lang="sass">
.cont
  display: flex
  justify-item: center
</style>
