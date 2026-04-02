<script setup lang="ts">
import { computed } from 'vue';

interface Button {
  to?: string | object;
  type?: 'transition' | 'add' | 'delete';
  size?: 'small' | 'medium';
  loading?: boolean;
}

const props = withDefaults(defineProps<Button>(), {
  type: 'transition',
  size: 'medium',
});

const isLink = computed(() => !!props.to);
const tag = computed(() => (isLink.value ? 'router-link' : 'button'));
</script>

<template>
  <component
    :is="tag"
    :to="to"
    v-bind="$attrs"
    :class="[
      'base-button',
      `base-button--${type}`,
      `base-button--${size}`,
      { 'is-loading': loading },
    ]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.base-button {
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  // Пример стилизации по типу
  &--add {
    background-color: #42b883;
    color: white;
  }
  &--delete {
    background-color: #ff4d4f;
    color: white;
  }
  &--transition {
    color: grey;
    
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    color: rgb(255, 9, 9);
  }
}
</style>
