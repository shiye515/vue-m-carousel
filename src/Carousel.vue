<template>
    <div class="carousel" :style="style">
        <div class="carousel-track" :style="trackStyle" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend" @touchcancel="onTouchcancel">
            {{{addonBefore}}}
            <slot></slot>
            {{{addonAfter}}}
        </div>
        <div class="carousel-indicators" v-if="indicators">
            <div class="carousel-dot" v-for="(index, item) in list" @click="transitionTo(index)">{{index}}</div>
        </div>
    </div>
</template>
<script>
var module = 'carousel'
export default {
    props: {
        loop: {
            type: Boolean,
            default: false
        },
        auto: {
            type: Number,
            default: 0
        },
        indicators: {
            type: Boolean,
            default: false
        },
        responsive: {
            type: Number,
            default: 40
        },
        flickThreshold: {
            type: Number,
            default: 0.6
        },
        delta: {
            type: Number,
            default: 100
        }
    },
    data() {
        return {
            addonBefore: '',
            addonAfter: '',
            activeIndex: 0,
            list: [],
            style: {
                height: '',
                paddingBottom: ''
            },
            trackStyle: {
                transform: 'translate(0px, 0px) translateZ(0px)',
                transitionDuration: '0ms'
            },
            transitionDuration: '600ms'
        }
    },
    events: {
        addItem(item) {
            this.list.push(item)
        },
        delItem(item) {
            this.list.$remove(item)
        }
    },
    watch: {
        list(value) {
            var len = value.length;
            if (len && this.loop) {
                this.addonBefore = value[len - 1].$el.outerHTML;
                this.addonAfter = value[0].$el.outerHTML;
            }
        }
    },
    methods: {
        slid(index, delta) {
            var {
                loop,
                width,
                transitionDuration,
                list
            } = this;
            var len = list.length;
            if (len === 0) {
                return;
            }
            if (!loop) {
                index = (index + len) % len;
            }
            this.trackStyle = {
                transform: 'translate(' + (-width * (index + (loop ? 1 : 0)) - delta) + 'px, 0px) translateZ(0px)',
                transitionDuration: transitionDuration
            }
            this.activeIndex = (index + len) % len;
        },
        calculatePos(e) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
            var xd = this.x - x;
            var yd = this.y - y;
            var axd = Math.abs(xd);
            var ayd = Math.abs(yd);
            return {
                deltaX: xd,
                deltaY: yd,
                absX: axd,
                absY: ayd
            }
        },
        transitionTo(index) {
            this.transitionDuration = '600ms';
            this.slid(index, 0);
        },
        onTouchstart(e) {
            if (e.touches.length > 1) {
                return
            }
            this.swiping = false;
            this.transitionDuration = '0ms';
            this.start = Date.now();
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
        },
        onTouchmove(e) {
            var pos = this.calculatePos(e);
            if (pos.absX > pos.absY) {
                this.swiping = true;
                this.slid(this.activeIndex, pos.deltaX);
            }
        },
        onTouchend(e) {
            if (!this.swiping) {
                return;
            }
            var pos = this.calculatePos(e);
            var time = Date.now() - this.start;
            var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
            var isFlick = velocity > this.flickThreshold;
            var activeIndex = this.activeIndex;
            if (isFlick || pos.absX > this.delta) {
                activeIndex = activeIndex + pos.absX / pos.deltaX;
            }
            this.transitionDuration = '600ms';
            this.slid(activeIndex, 0);
        },
        onTouchcancel(e) {
            this.transitionDuration = '600ms';
            this.slid(this.activeIndex, 0);
        }
    },
    init() {
        console.log(module, 'init')
    },
    created() {
        console.log(module, 'created')
        if (this.responsive !== 0) {
            this.style.height = 0;
            this.style.paddingBottom = this.responsive + '%';
        }
    },
    beforeCompile() {
        console.log(module, 'beforeCompile')
    },
    compiled() {
        console.log(module, 'compiled')
    },
    ready() {
        console.log(module, 'ready');
        var {
            auto
        } = this;
        if (auto) {
            this.timer = setInterval(() => {
                this.transitionTo(this.activeIndex + 1)
            }, auto)
        }
    },
    attached() {
        console.log(module, 'attached')
        this.width = this.$el.offsetWidth;
        this.$broadcast('width', this.width);
        this.slid(this.activeIndex, 0);
    },
    detached() {
        console.log(module, 'detached')
    },
    beforeDestroy() {
        console.log(module, 'beforeDestroy')
    },
    destroyed() {
        console.log(module, 'destroyed')
    }
}
</script>
<style lang="less">
.carousel {
    width: 100%;
    overflow: hidden;
    position: relative;
    &-track {
        height: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
    }
    &-indicators {
        position: absolute;
        height: 0;
        bottom: 40px;
        left: 0;
        width: 100%;
        text-align: center;
    }
    &-dot {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 10px;
        background: rgba(0, 0, 0, 0.5)
    }
}
</style>
