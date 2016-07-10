# vue-m-carousel
vue 移动端轮播组件 [live demo](https://shiye515.github.io/vue-m-carousel/)

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/vue-m-carousel.svg?style=flat-square
[npm-url]: http://npmjs.org/package/vue-m-carousel
[download-image]: https://img.shields.io/npm/dm/vue-m-carousel.svg?style=flat-square
[download-url]: https://npmjs.org/package/vue-m-carousel

##简介（Intro）

- 移动端高性能轮播组件
- 除了vue之外不依赖其他库
- 动画通过 transform 和 translate 实现，布局通过flex实现
- 支持响应式布局，也支持固定布局
- 提供动画结束的回调

## install

[![vue-m-carousel](https://nodei.co/npm/vue-m-carousel.png)](https://npmjs.org/package/vue-m-carousel)

`npm install vue-m-carousel`

## 用法
```html
    <carousel :indicators="true" :auto="3000">
        <carousel-item>carousel-item-0</carousel-item>
        <carousel-item>carousel-item-1</carousel-item>
        <carousel-item>carousel-item-2</carousel-item>
        <carousel-item>carousel-item-3</carousel-item>
        <carousel-item>carousel-item-4</carousel-item>
        <carousel-item>carousel-item-5</carousel-item>
    </carousel>
```
```javascript
import Carousel from 'vue-m-carousel/src/Carousel'
import CarouselItem from 'vue-m-carousel/src/CarouselItem'
export default {
    components: {
        Carousel,
        CarouselItem
    }
}
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>loop</td>
          <td>Boolean</td>
          <td>true</td>
          <td>是否循环播放</td>
        </tr>
        <tr>
          <td>auto</td>
          <td>Number</td>
          <td>3000</td>
          <td>是否自动播放，0不自动播放，其他值则自动播放，值为其自动播放的interval</td>
        </tr>
        <tr>
          <td>indicators</td>
          <td>Boolean</td>
          <td>false</td>
          <td>是否添加屏点，不带任何样式，样式可参考demo写</td>
        </tr>
        <tr>
          <td>responsive</td>
          <td>Number</td>
          <td>40</td>
          <td>是否开启响应式高度，若为0则不开启，其他正整数表示 高度是宽度的百分之多少</td>
        </tr>
        <tr>
          <td>flickThreshold</td>
          <td>Number</td>
          <td>0.6</td>
          <td>轻弹的最小速度</td>
        </tr>
        <tr>
          <td>delta</td>
          <td>Number</td>
          <td>100</td>
          <td>滚动时触发滚动到下一张的最小值</td>
        </tr>
        <tr>
          <td>onSlidEnd</td>
          <td>Function</td>
          <td>noop</td>
          <td>轮播切换完成时的回调</td>
        </tr>
    </tbody>
</table>
