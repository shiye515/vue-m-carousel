import './style.less';
let defaultDuration = 300;
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        auto: {
            type: Number,
            default: 3000
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
        },
        onSlidEnd: {
            type: Function,
            default: i => 0
        },
        preventDefault: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            touch: false,
            timer: 0,
            activeIndex: 0,
            trackStyle: {
                transform: 'translate(0px, 0px) translateZ(0px)',
                transitionDuration: 0
            },
            transitionDuration: defaultDuration,
            width: '100vw'
        };
    },
    computed: {
        computedAuto() {
            return this.auto && this.$slots.default.length > 1;
        },
        computedLoop() {
            return this.$slots.default.length > 1 ? this.loop : false;
        }
    },
    methods: {
        setHelperDOM() {
            let len = this.$slots.default.length;
            if (len > 1 && this.loop) {
                this.addonBefore = this.list[len - 1].$el.outerHTML;
                this.addonAfter = this.list[0].$el.outerHTML;
            }
        },
        slid(index, delta) {
            let {
                computedLoop,
                width,
                transitionDuration,
                $slots
            } = this;
            let len = $slots.default.length;
            if (len === 0) {
                return;
            }
            if (!computedLoop) {
                index = (index + len) % len;
            }
            let translateX = -width * (index + (computedLoop ? 1 : 0)) - delta;
            this.trackStyle = {
                transform: 'translate(' + translateX + 'px, 0px) translateZ(0px) translate3d(0, 0, 0)',
                transitionDuration: transitionDuration + 'ms',
                '-webkit-backface-visibility': 'hidden'
            };
            this.activeIndex = (index + len) % len;
            if (transitionDuration > 0 && computedLoop && (this.activeIndex === 0 || this.activeIndex === len - 1)) {
                setTimeout(this.correctIndex, transitionDuration);
            }
            if (transitionDuration > 0) {
                this.onSlidEnd(this.activeIndex);
            }
        },
        correctIndex() {
            this.transitionDuration = 0;
            this.slid(this.activeIndex, 0);
        },
        calculatePos(e) {
            let x = e.changedTouches[0].clientX;
            let y = e.changedTouches[0].clientY;
            let xd = this.x - x;
            let yd = this.y - y;
            let axd = Math.abs(xd);
            let ayd = Math.abs(yd);
            return {
                deltaX: xd,
                deltaY: yd,
                absX: axd,
                absY: ayd
            };
        },
        setTimer() {
            let {
                auto,
                $slots
            } = this;
            let len = $slots.default.length;
            if (auto && len > 1) {
                this.timer = setInterval(() => {
                    this.transitionTo(this.activeIndex + 1);
                }, auto);
            }
        },
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        transitionTo(index, duration) {
            this.clearTimer();
            this.transitionDuration = duration || defaultDuration;
            this.slid(index, 0);
            this.setTimer();
        },
        onTouchstart(e) {
            if (e.touches.length > 1) {
                return;
            }
            if (this.$slots.default.length === 1) {
                this.touch = false;
                return;
            }
            this.touch = true;
            this.transitionDuration = 0;
            this.start = Date.now();
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
            this.clearTimer();
        },
        onTouchmove(e) {
            if (this.preventDefault) {
                e.preventDefault();
            }
            if (!this.touch) {
                return;
            }
            let pos = this.calculatePos(e);
            if (pos.absX > pos.absY) {
                e.preventDefault();
                this.slid(this.activeIndex, pos.deltaX);
            }
        },
        onTouchend(e) {
            if (!this.touch) {
                return;
            }
            let {loop, $slots, start, flickThreshold, delta, activeIndex} = this;
            let pos = this.calculatePos(e);
            let time = Date.now() - start;
            let velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
            let isFlick = velocity > flickThreshold;
            let newIndex = activeIndex;
            if (isFlick || pos.absX > delta) {
                newIndex = newIndex + pos.absX / pos.deltaX;
                if (!loop) {
                    newIndex = Math.max(Math.min(newIndex, $slots.default.length - 1), 0);
                }
            }
            this.transitionTo(newIndex);
            this.cleanTouch();
        },
        onTouchcancel(e) {
            if (!this.touch) {
                return;
            }
            this.transitionTo(this.activeIndex);
            this.cleanTouch();
        },
        cleanTouch() {
            this.touch = false;
        },
        resize() {
            this.$nextTick(function afterResize() {
                this.width = this.$el.clientWidth;
                this.slid(this.activeIndex, 0);
            }, this);
        }
    },
    watch: {
        auto() {
            this.setTimer();
        }
    },
    render(h) {
        let {computedLoop, $slots} = this;
        let len = $slots.default.length - 1;

        let indicators = this.indicators && (
            <div class="carousel-indicators">
                {this.$slots.default.map((v, i) => {
                    let classname = {'carousel-dot': true, 'active': i === this.activeIndex};
                    return <div class={classname} on-click={this.transitionTo.bind(this, i, defaultDuration)}>{i}</div>;
                })}
            </div>
        );

        let style = {};
        if (this.responsive !== 0) {
            style.height = '0';
            style.paddingBottom = this.responsive + '%';
        }
        let itemStyle = {
            width: this.width + (typeof this.width === 'number' ? 'px' : '')
        };
        return (
            <div class="carousel" style={style}>
                <div
                    class="carousel-track"
                    style={this.trackStyle}
                    on-touchstart={this.onTouchstart}
                    on-touchmove={this.onTouchmove}
                    on-touchend={this.onTouchend}
                    on-touchcancel={this.onTouchcancel}
                >
                    {computedLoop
                        ? <div class="carousel-item" style={itemStyle}>{this.$slots.default[len]}</div>
                        : null
                    }
                    {this.$slots.default.map(v => <div class="carousel-item" style={itemStyle}>{v}</div>)}
                    {computedLoop ? <div class="carousel-item" style={itemStyle}>{this.$slots.default[0]}</div> : null}
                </div>
                {indicators}
            </div>
        );
    },
    mounted() {
        // 保证 this.$el 已经插入文档
        this.$nextTick(() => {
            this.resize();
            window.addEventListener('resize', this.resize);
            this.setTimer();
        });
        document.addEventListener('visibilitychange', e => {
            let timer = document.hidden ? this.clearTimer : this.setTimer;
            timer();
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
        this.clearTimer();
    }
};
