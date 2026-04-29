<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();
defineEmits(['close']);
</script>

<template>
  <div v-if="isOpen" class="open" @click="$emit('close')">
    <div class="open__content" @click.stop>
      <slot></slot>
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
