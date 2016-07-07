# vue-m-carousel
vue 移动端轮播组件

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
          <td>bool</td>
          <td>false</td>
          <td>是否循环播放</td>
        </tr>
        <tr>
          <td>auto</td>
          <td>Number</td>
          <td>0</td>
          <td>是否自动播放，0不自动播放，其他值则自动播放，值为其自动播放的interval</td>
        </tr>
        <tr>
          <td>indicators</td>
          <td>bool</td>
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
    </tbody>
</table>
