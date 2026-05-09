<script setup lang="ts">
import { computed } from 'vue'; 

const props = defineProps<{ book: any }>();

const bookCover = computed(() => {

  return props.book.image || props.book.cover || null;
});

const bookTitle = computed(() => {
  return props.book.bookName || props.book.title || 'Без названия';
});
</script>

<template>
  <router-link :to="`/book/${book.id}`" class="card-link">
    <article class="book-card">
      <div class="book-card__image-container">
        <img v-if="bookCover" :src="bookCover" class="book-card__image" />
        <div v-else class="book-card__placeholder">
          <span>Нет обложки</span>
        </div>
      </div>
      
      <div class="book-card__content">
        <h3 class="book-card__title">{{ bookTitle }}</h3>
      </div>
    </article>
  </router-link>
</template>

<style scoped lang="sass">
.card-link
  text-decoration: none
  color: inherit
  display: block

.book-card
  width: 100%
  max-width: 190px
  display: flex
  flex-direction: column
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)

  &:hover
    transform: translateY(-8px)
    .book-card__image-container
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2)
    .book-card__hover-overlay
      opacity: 1

  &__image-container
    position: relative
    width: 100%
    aspect-ratio: 2 / 3
    border-radius: 12px
    overflow: hidden
    background-color: #f5f5f5
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
    transition: all 0.3s ease

  &__image
    width: 100%
    height: 100%
    object-fit: cover

  &__placeholder
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    color: #aaa
    font-size: 12px
    background: #fafafa

  &__rating-badge
    position: absolute
    top: 8px
    right: 8px
    background: rgba(255, 255, 255, 0.9)
    padding: 2px 6px
    border-radius: 6px
    font-size: 11px
    font-weight: 700
    color: #333
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
    z-index: 2

  &__hover-overlay
    position: absolute
    inset: 0
    background: rgba(0, 0, 0, 0.3)
    display: flex
    align-items: center
    justify-content: center
    opacity: 0
    transition: opacity 0.2s ease
    .view-more
      color: white
      font-size: 12px
      font-weight: 600
      padding: 6px 12px
      border: 1px solid white
      border-radius: 20px

  &__content
    padding: 12px 4px

  &__title
    font-size: 14px
    font-weight: 700
    color: #222
    margin: 0 0 4px 0
    line-height: 1.3
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden

  &__author
    font-size: 13px
    color: #555
    margin: 0
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  &__genres
    font-size: 11px
    color: #2196F3 // Выделим синим цветом
    margin-top: 4px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    text-transform: lowercase

  &__footer
    margin-top: 6px
    display: flex
    justify-content: flex-start
    align-items: center

  &__year
    font-size: 12px
    color: #999
    font-weight: 500
</style>
