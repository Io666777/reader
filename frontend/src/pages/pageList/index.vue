<script setup lang="ts">
import { computed } from 'vue';
import bookCatalog from '../../widgets/bookList/index.vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const bookPage = computed(()=>{
  return route.name ==='home'
})
</script>

<template>
  <bookCatalog :this-page="bookPage" />
</template>
