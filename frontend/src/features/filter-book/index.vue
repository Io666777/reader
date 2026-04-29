<script setup lang="ts">
import { onMounted, ref } from 'vue';

const availableGenres = ref<string[]>([]);
const availableYears = ref<number[]>([]);

onMounted(async()=>{
  
})
</script>

<template>
  <div class="filter-box">
    <div class="section">
      <p class="title">Категория</p>
      <select v-model="selectedGenre">
        <option value="">Все жанры</option>
        <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
      </select>
    </div>

    <div class="section">
      <p class="title">Год издания</p>
      <select v-model="selectedYear">
        <option value="">Любой год</option>
        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="sass">
.open
    position: absolute
    top: 100%
    right: 0
    margin-top: 10px
    z-index: 100
    &__content
        background: white
        border-radius: 12px
        box-shadow: 0 8px 24px rgba(0,0,0,0.15)
        border: 1px solid #eee
        padding: 16px
        min-width: 200px
</style>
