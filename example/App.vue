<template>
    <div id="app">
        <carousel :indicators="true" :loop="true" :auto="2000">
            <carousel-item index="0">0</carousel-item>
            <carousel-item index="1">1</carousel-item>
            <carousel-item index="2">2</carousel-item>
            <carousel-item index="3">3</carousel-item>
            <carousel-item index="4">4</carousel-item>
            <carousel-item index="5">5</carousel-item>
        </carousel>
    </div>
</template>
<script>
import Carousel from '../src/Carousel'
import CarouselItem from '../src/CarouselItem'

export default {
    components: {
        Carousel,
        CarouselItem
    }
}
</script>
<style lang="less">
body {
    margin: 0;
}

.carousel {
    height: 100px;
    &-item {
        border: 1px solid red;
    }
}
</style>
