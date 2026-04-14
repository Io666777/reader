<script setup lang="ts">
import type { BookDisplayData } from '../types';

defineProps<{
  book: BookDisplayData;
}>();
</script>

<template>
  <article class="book-card" role="button" tabindex="0">
    <div class="book-card__image-container">
      <img
        v-if="book.cover || book.image"
        :src="book.cover || book.image"
        class="book-card__image"
      />

      <div class="book-card__hover-overlay">
        <span class="book-card__add-icon">+</span>
      </div>
    </div>

    <div class="book-card__content">
      <h3 class="book-card__title">
        {{ book.title || book.bookName || 'Без названия' }}
      </h3>

      <p class="book-card__author">
        {{
          typeof book.author === 'string'
            ? book.author
            : book.author?.name || 'Автор неизвестен'
        }}
      </p>

      <span class="book-card__year">{{
        book.realiseYear || book.year || 'Год неизв.'
      }}</span>
    </div>
  </article>
</template>

<style scoped lang="sass">
.book-card
  width: 100%
  max-width: 190px
  display: flex
  flex-direction: column
  cursor: pointer
  background: none
  border: none
  padding: 0
  text-align: left
  outline: none
  transition: transform 0.2s ease

  // Эффект "приподнимания" всей карточки
  &:hover
    transform: translateY(-6px)

    .book-card__image-container
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15)

    .book-card__hover-overlay
      opacity: 1

  &__image-container
    position: relative
    width: 100%
    aspect-ratio: 2 / 3
    border-radius: 12px
    overflow: hidden
    background-color: #f0f0f0
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
    transition: box-shadow 0.3s ease

  &__img
    width: 100%
    height: 100%
    object-fit: cover

  // Появление плюса или иконки при наведении
  &__hover-overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(33, 150, 243, 0.1) // Легкий оттенок при наведении
    display: flex
    align-items: center
    justify-content: center
    opacity: 0
    transition: opacity 0.2s ease

  &__add-icon
    width: 40px
    height: 40px
    background: #2196f3
    color: white
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    font-size: 24px
    font-weight: bold
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2)

  &__content
    padding: 12px 4px 0 4px

  &__title
    font-size: 15px
    font-weight: 600
    color: #1a1a1a
    margin: 0 0 4px 0
    line-height: 1.2
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden

  &__author
    font-size: 13px
    color: #666
    margin: 0

  &__year
    font-size: 12px
    color: #999
    display: block
    margin-top: 2px
</style>
