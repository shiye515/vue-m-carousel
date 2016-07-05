<template>
    <div class="carousel-item" :style="style">
        carousel-item
        <slot></slot>
    </div>
</template>
<script>
var module = 'carousel-item'
export default {
    props: ['index'],
    init() {
        console.info(module, this.index, 'init')
    },
    data() {
        return {
            style: {
                width: document.documentElement.offsetWidth + 'px'
            }
        }
    },
    events: {
        width(width) {
            this.style.width = width + 'px';
        }
    },
    methods: {},
    created() {
        console.info(module, this.index, 'created')
        this.$dispatch('addItem', this)
    },
    beforeCompile() {
        console.info(module, this.index, 'beforeCompile')
    },
    compiled() {
        console.info(module, this.index, 'compiled')
    },
    ready() {
        console.info(module, this.index, 'ready')
    },
    attached() {
        console.info(module, this.index, 'attached')
    },
    detached() {
        console.info(module, this.index, 'detached')
    },
    beforeDestroy() {
        console.info(module, this.index, 'beforeDestroy')
        this.$dispatch('delItem', this)
    },
    destroyed() {
        console.info(module, this.index, 'destroyed')
    }
}
</script>
<style lang="less">
.carousel {
    &-item {
        height: 100%;
        width: 90px;
        box-sizing: border-box;
    }
}
</style>
