import Vue from 'vue'
import { Carousel, CarouselItem } from 'src/index'

describe('Carousel.vue', () => {
    it('should have right indicators', () => {
        const vm = new Vue({
            template: '<div><carousel :indicators="true"><carousel-item>carousel-item-0</carousel-item><carousel-item>carousel-item-1</carousel-item><carousel-item>carousel-item-2</carousel-item><carousel-item>carousel-item-3</carousel-item></carousel></div>',
            components: { Carousel, CarouselItem }
        }).$mount()
        expect(vm.$el.querySelectorAll('.carousel-dot')).to.have.length(4);
    })

    // it('should have right item number when auto', () => {
    //     const vm = new Vue({
    //         template: '<div><carousel :indicators="true"><carousel-item>carousel-item-0</carousel-item><carousel-item>carousel-item-1</carousel-item><carousel-item>carousel-item-2</carousel-item><carousel-item>carousel-item-3</carousel-item></carousel></div>',
    //         components: { Carousel, CarouselItem }
    //     }).$mount()
    //     expect(vm.$el.querySelectorAll('.carousel-item')).to.have.length(6);
    // })
    // it('should have right item number when unauto', () => {
    //     const vm = new Vue({
    //         template: '<div><carousel :indicators="true" :auto="2000"><carousel-item>carousel-item-0</carousel-item><carousel-item>carousel-item-1</carousel-item><carousel-item>carousel-item-2</carousel-item><carousel-item>carousel-item-3</carousel-item></carousel></div>',
    //         components: { Carousel, CarouselItem }
    //     }).$mount()
    //     expect(vm.$el.querySelectorAll('.carousel-item')).to.have.length(4);
    // })
})
