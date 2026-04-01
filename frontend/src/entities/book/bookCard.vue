<template>
    <div class="card">
        <div class="card-image">
            <img src="https://tse4.mm.bing.net/th/id/OIP.HoIWYE7daLzrNDor3K_swgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Card image">
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
    max-width: 100%
    
    border: 1px solid #e0e0e0
    border-radius: 8px
    overflow: hidden
    font-family: Arial, sans-serif

    .card-image
        img
            width: 100%
            // height: 100px
            display: block

    .card-content
        padding: 16px

        p
            margin: 8px 0

        .title
            font-size: 18px
            font-weight: bold
            color: #333

        .description
            font-size: 14px
            color: #666

        .price
            font-size: 20px
            font-weight: bold
            color: #2196f3
</style>