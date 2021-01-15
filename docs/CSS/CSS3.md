## CSS3 文档

[菜鸟教程 css3 文档](https://www.runoob.com/css/css-tutorial.html)

[ css3 文档](https://www.xp.cn/css3/)

## 过渡 transition。

- transition： 过渡属性，花费时间，效果曲线(默认 ease)，延迟时间(默认 0)
  - transition-property: 过渡属性
  - transition-duration: 过渡时间
  - transition-timing-function: 过渡时间曲线
    - ease: 默认值 由慢变快 然后再变慢
    - linear: 相同速度开始至结束
    - ease-in: 慢速开始
    - ease-out: 慢速结束
    - ease-in-out: 规定以慢速开始和结束的过渡效果
    - cubic-bezier(n,n,n,n): 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
  - transition-delay: 过渡延迟时间
- 触发过渡的方式
  - 伪类:hover :checked 等
  - 媒体查询 窗口改变的时候触发
  - js 改变元素样式触发

## 2D 3D 转换 transform。

- 注意必须是块级元素。
- transform: 2d
  - rotate(度数): 旋转。正数顺时针 负数逆时针
  - translate(x, y): 位移。
  - skew(x, y): 倾斜。
  - scale(x 倍数, y 倍数): 缩放。
- transform: 3d
  - rotateX(度数) rotateY(度数) rotateZ(度数) 或者可以写成 rotate3d(x, y, z, 度数) xyz 是 0 到 1 的值，不太好用。
  - translateX(值) translateY(值) translateZ(值)或者写成 translate3d(x, y, z)
  - skewX(值) skewY(值)没有 skewZ
  - scaleX(值) scaleY(值) scaleZ(值) 或者写成 scale3d(x, y, z)

## 动画 animation。

- 定义动画
  - @keyframes 动画名称
- 调用动画
  - animation：动画名称，一个周期花费时间，运动曲线（默认 ease），动画延迟（默认 0），播放次数（默认 1），是否反向播放动画（默认 normal），animation-fill-mode，是否暂停动画（默认 running）
    - animation-name: 动画名称
    - animation-duration: 动画持续时间
    - animation-timing-function: 时间曲线
      - ease: 默认值 由慢变快 然后再变慢
      - linear: 相同速度开始至结束
      - ease-in: 慢速开始
      - ease-out: 慢速结束
      - ease-in-out: 规定以慢速开始和结束的过渡效果
      - cubic-bezier(n,n,n,n): 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
      - 逐帧动画使用 steps(number_of_steps, direction)函数
        - step-start 等同于 steps(1, start)：动画执行时以开始端点为开始。
        - step-end 等同于 steps(1, end)：动画执行时以结尾端点为开始
    - animation-delay: 动画延迟时间
    - animation-iteration-count: 动画播放次数 默认是 1
      - 数字指定次数, infinite 无限次数
    - animation-direction: 规定动画是否在下一周期逆向地播放。默认是 "normal"
      - normal 正常播放
      - reverse 反向播放
      - alternate 奇数次正向播放
      - alternate-reverse 偶数次正向播放
    - animation-fill-mode: 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
      - none：默认值。不设置对象动画之外的状态
      - forwards：设置对象状态为动画结束时的状态
      - backwards：设置对象状态为动画开始时的状态
      - both：设置对象状态为动画结束或开始的状态
    - animation-play-state: 规定动画是否正在运行或暂停。默认是 "running"。
      - running：运动
      - paused：暂停

## 阴影 box-shoadow。

- 阴影不会占据空间。
- box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向(默认是从里往外，设置 inset 就是从外往里)。
  - 水平阴影的位置一般是 0，设置为正数阴影往右偏移，设置为负数往左边偏移。
  - 垂直阴影的位置一般是 0，设置为正数往下偏移，设置为负数往上偏移。
  - 模糊距离是阴影呈模糊状的长度。
  - 阴影的大小就是阴影的大小长度 自定义。
  - 阴影的颜色就是颜色 自定义。
  - 阴影的开始方向默认是从里往外，设置 inset 就是从外到里。阴影不占据大小，两元素阴影可能会重叠。

## 边框图片 边框圆角 背景图片

border-image border-radius background-image

## 渐变

- 必须和 background-image 配合使用
- 线性渐变 linear-gradient (方向，颜色 1，颜色 2，颜色 3......)
  - 方向可以使用方向或者度数，默认 to bottom。使用默认方向第一个参数可以省略。
  - 如果使用度数顺时针方向 0 度由下往上，90 度由左往右。
  - 颜色可以使用 rgba()设置透明度。
- 径向渐变 radial-gradient (方向，形状， 大小， 颜色 1， 颜色 2 ....)

## 媒体查询 @media

```css
@media not|only mediatype and (media feature) {
  /* css code; */
}
```

## 盒模型 content-box

- 控制盒子模型的属性是 box-sizing，默认值是 content-box。
- 属性值为 content-box 的时候是标准盒子模型：元素宽度=设置的宽度（content）+ border + padding + margin
- 属性值为 border-box 的时候是 IE 盒子模型：元素宽度=设置的宽度（content+border+padding）+ margin

## 常见问题

### 过渡和动画的区别是什么？

- 过渡只能指定元素的初始状态和结束状态，而动画可以控制多个阶段。
- 过渡需要有触发条件，而动画不需要触发条件。
- 动画的子属性更多可以控制循环次数 方向等等。
