<template>
    <div id="app">
        <carousel :indicators="true" :on-slid-end="slidEnd" :auto="auto">
            <div class="carousel-i" v-for="i in 3" @click="log(i-1)">carousel-item-{{i-1}}</div>
        </carousel>
        <div>---</div>
        <carousel :indicators="true" :on-slid-end="slidEnd" :auto="auto">
            <div class="carousel-i" @click="log(0)">只有一个没有动画</div>
        </carousel>
        <button @click="toggle">toggle auto</button>
    </div>
</template>
<script>
import Carousel from '../src/index.js'

export default {
    components: {
        Carousel
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
    &-i {
        border: 1px solid red;
        height: 100%;
        box-sizing: border-box;
    }
}
</style>
