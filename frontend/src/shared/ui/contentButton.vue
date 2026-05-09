<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
//   icon?: string;
}>();

defineEmits(['click']);
</script>

<template>
  <button
    class="filter-btn"
    :class="{ 'filter-btn--active': isOpen }"
    @click="$emit('click')"
  >
    <slot> </slot>
  </button>
</template>

<style scoped lang="sass">
.filter-btn
  background: white
  border: 1px solid #fafafa
  border-radius: 10px
  padding: 8px
  cursor: pointer
  transition: all 0.2s
  display: flex
  align-items: center
  justify-content: center

  &:hover
    background: #f5f5f5

</style>
