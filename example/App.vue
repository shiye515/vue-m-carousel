<template>
    <div id="app">
        <carousel :indicators="true" :on-slid-end="slidEnd" :auto="auto">
            <carousel-item @click="log(0)">carousel-item-0</carousel-item>
            <carousel-item @click="log(1)">carousel-item-1</carousel-item>
            <carousel-item @click="log(2)">carousel-item-2</carousel-item>
        </carousel>
    </div>
    <button @click="toggle">toggle auto</button>
</template>
<script>
import Carousel from '../src/Carousel'
import CarouselItem from '../src/CarouselItem'

export default {
    components: {
        Carousel,
        CarouselItem
    },
    data() {
        return {
            auto: 3000
        }
    },
    methods: {
        slidEnd(index) {
            // console.log(index)
        },
        log(i) {
            console.log(i)
        },
        toggle() {
            this.auto = this.auto === 0 ? 3000 : 0
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
