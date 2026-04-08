<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string | number | null;
  placeholder?: string;
  type?: string;
  mode: 'local' | 'external';
  suggestions?: any[]; // Массив объектов (книги из БД или API)
}>();

const emit = defineEmits(['update:modelValue', 'select']);

const isDropdownVisible = ref(false);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  // Показываем список только если есть что вводить и есть сами подсказки
  isDropdownVisible.value = target.value.length > 2;
};

const hideDropdown = () => {
  setTimeout(() => {
    isDropdownVisible.value = false;
  }, 200);
};

const selectSuggestion = (item: any) => {
  emit('select', item);
  isDropdownVisible.value = false;
};
</script>

<template>
  <div class="base-input-wrapper" @focusout="hideDropdown">
    <input
      :value="modelValue"
      :type="type || 'text'"
      class="base-input"
      @input="onInput"
      @focus="isDropdownVisible = (modelValue?.toString().length || 0) > 2"
      :placeholder="placeholder || (mode === 'local' ? 'Искать в моей библиотеке...' : 'Искать новые книги...')"
    />

    <transition name="fade">
      <ul v-if="isDropdownVisible && suggestions && suggestions.length > 0" class="suggestions-list">
        <li 
          v-for="(item, index) in suggestions" 
          :key="index" 
          class="suggestion-item"
          @click="selectSuggestion(item)"
        >
          <img 
            :src="item.image || item.cover || 'https://via.placeholder.com/35x50?text=?'" 
            class="mini-cover" 
          />
          <div class="info">
            <span class="title">{{ item.bookName || item.title }}</span>
            <span class="author">{{ item.author?.name || item.author || 'Автор не указан' }}</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="sass" scoped>
// Твои стили из сообщения полностью подходят, 
// я только добавил фикс для z-index и позиционирования
.base-input-wrapper
  width: 100%
  position: relative

.base-input
  width: 100%
  padding: 12px 20px
  border: 1px solid #ddd
  border-radius: 12px
  font-size: 16px
  outline: none
  background: #fdfdfd
  transition: all 0.2s ease
  font-family: inherit
  &:focus
    border-color: #2196f3
    background: #fff
    box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.1)

.suggestions-list
  position: absolute
  top: 110% // Чуть ниже инпута
  left: 0
  right: 0
  background: #fff
  border-radius: 12px
  box-shadow: 0 10px 25px rgba(0,0,0,0.1)
  border: 1px solid #eee
  z-index: 999
  padding: 8px 0
  margin: 0
  list-style: none
  max-height: 280px
  overflow-y: auto

.suggestion-item
  display: flex
  align-items: center
  padding: 10px 16px
  cursor: pointer
  gap: 12px
  transition: background 0.2s
  &:hover
    background: #f0f7ff

.mini-cover
  width: 32px
  height: 45px
  object-fit: cover
  border-radius: 4px
  flex-shrink: 0

.info
  display: flex
  flex-direction: column
  overflow: hidden
  .title
    font-size: 14px
    font-weight: 600
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .author
    font-size: 12px
    color: #777

.fade-enter-active, .fade-leave-active
  transition: opacity 0.2s, transform 0.2s
.fade-enter-from, .fade-leave-to
  opacity: 0
  transform: translateY(-10px)
</style>