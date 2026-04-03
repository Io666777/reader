<template>
  <div class="card">
    <div class="card-image">
      <img
        src="https://tse4.mm.bing.net/th/id/OIP.HoIWYE7daLzrNDor3K_swgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Card image"
      />
    </div>
    <div class="card-content">
      <p class="title">dsa</p>
      <p class="description">dassd</p>
      <p class="price">54</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.card
    display: flex
    flex-direction: column
    height: 300px // Важно! Карточка растягивается на всю высоту ячейки
    border: 1px solid #e0e0e0
    border-radius: 12px
    background: #fff
    overflow: hidden
    transition: transform 0.2s ease, box-shadow 0.2s ease
    
    &:hover
        transform: translateY(-4px)
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1)

    .card-image
        width: 100%
        aspect-ratio: 16 / 9 // Фиксированное соотношение сторон для изображения
        overflow: hidden
        
        img
            width: 100%
            height: 100%
            object-fit: cover // Изображение заполняет контейнер без искажений
            transition: transform 0.3s ease
            
        &:hover img
            transform: scale(1.05) // Эффект увеличения при наведении

    .card-content
        padding: 16px
        display: flex
        flex-direction: column
        flex: 1 // Растягивает контентную часть
        gap: 8px

        .title
            font-size: 18px
            font-weight: bold
            color: #333
            margin: 0

        .description
            font-size: 14px
            color: #666
            margin: 0
            // Обрезаем длинное описание до 3 строк
            display: -webkit-box
            -webkit-line-clamp: 3
            -webkit-box-orient: vertical
            overflow: hidden
            line-height: 1.4

        .price
            font-size: 20px
            font-weight: bold
            color: #2196f3
            margin: 0
            margin-top: auto // Прижимает цену к низу
</style>
