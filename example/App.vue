<template>
    <div id="app">
        <carousel :indicators="true" :on-slid-end="slidEnd">
            <carousel-item @click="log(0)">carousel-item-0</carousel-item>
            <carousel-item @click="log(1)">carousel-item-1</carousel-item>
            <carousel-item @click="log(2)">carousel-item-2</carousel-item>
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
    },
    methods: {
        slidEnd(index) {
            // console.log(index)
        },
        log(i) {
            console.log(i)
        }
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
