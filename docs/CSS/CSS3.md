### 1、过渡 transition。
*  transition： 过渡属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
    * transition-property: 过渡属性
    * transition-duration: 过渡时间
    * transition-timing-function: 过渡时间曲线
      * ease: 默认值 由慢变快 然后再变慢
      * linear: 相同速度开始至结束
      * ease-in: 慢速开始
      * ease-out: 慢速结束
      * ease-in-out: 规定以慢速开始和结束的过渡效果
      * cubic-bezier(n,n,n,n): 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
    * transition-delay: 过渡延迟时间
    * 触发过渡的方式
      * 伪类:hover :checked等
      * 媒体查询 窗口改变的时候触发
      * js改变元素样式触发

### 2、2D 3D转换 transform。
*  注意必须是块级元素。
*  transform: 2d
    * rotate(度数): 正数顺时针 负数逆时针
    * translate(x, y): 位移
    * skew(x, y): 倾斜
    * scale(x倍数, y倍数): 缩放
*  transform: 3d
    * rotateX(度数) rotateY(度数) rotateZ(度数) 或者可以写成rotate3d(x, y, z, 度数) xyz是0到1的值，比较鸡肋。
    * translateX(值) translateY(值) translateZ(值)或者写成translate3d(x, y, z)
    * skewX(值) skewY(值)没有skewZ
    * scaleX(值) scaleY(值) scaleZ(值) 或者写成scale3d(x, y, z)

### 3、动画 animation。
*  定义动画
    * @keyframes 动画名称
*  调用动画
    * animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），animation-fill-mode，是否暂停动画（默认running）
      * animation-name: 动画名称
      * animation-duration: 动画持续时间
      * animation-timing-function: 时间曲线
        * ease: 默认值 由慢变快 然后再变慢
        * linear: 相同速度开始至结束
        * ease-in: 慢速开始
        * ease-out: 慢速结束
        * ease-in-out: 规定以慢速开始和结束的过渡效果
        * cubic-bezier(n,n,n,n): 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
      * animation-delay: 动画延迟时间
      * animation-iteration-count: 动画播放次数 默认是1
        * 数字指定次数, infinite无限次数
      * animation-direction: 规定动画是否在下一周期逆向地播放。默认是 "normal"
        * normal 正常播放
        * reverse 反向播放
        * alternate 奇数次正向播放
        * alternate-reverse 偶数次正向播放
      * animation-fill-mode: 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
        * none：默认值。不设置对象动画之外的状态
        * forwards：设置对象状态为动画结束时的状态
        * backwards：设置对象状态为动画开始时的状态
        * both：设置对象状态为动画结束或开始的状态
      * animation-play-state: 规定动画是否正在运行或暂停。默认是 "running"。
        * running：运动
        * paused：暂停

### 4、阴影 box-shoadow。
*  阴影不会占据空间。
*  box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向(默认是从里往外，设置inset就是从外往里)。
    * 水平阴影的位置一般是0，设置为正数阴影往右偏移，设置为负数往左边偏移。
    * 垂直阴影的位置一般是0，设置为正数往下偏移，设置为负数往上偏移。
    * 模糊距离是阴影呈模糊状的长度。
    * 阴影的大小就是阴影的大小长度 自定义。
    * 阴影的颜色就是颜色 自定义。
    * 阴影的开始方向默认是从里往外，设置inset就是从外到里。阴影不占据大小，两元素阴影可能会重叠。

### 5、边框图片 边框圆角 背景图片
  border-image border-radius background-image

### 6、渐变
*  必须和background-image配合使用
*  线性渐变 linear-gradient (方向，颜色1，颜色2，颜色3......)
    * 方向可以使用方向或者度数，默认to bottom。使用默认方向第一个参数可以省略。
    * 如果使用度数顺时针方向0度由下往上，90度由左往右。
    * 颜色可以使用rgba()设置透明度。
*  径向渐变 radial-gradient (方向，形状， 大小， 颜色1， 颜色2 ....)

### 7、flex布局
*  特点
    * 使用flex布局后容器内元素的float、clear、vertical-align属性将失效。
*  启用flex布局
    * 行内元素 display: inline-flex
    * 块级元素 display: flex
*  容器的属性
    * flex-direction
      控制主轴方向 row(默认) row-reverse column column-reverse
    * flex-wrap
      排列放不下时，如何换行 nowrap(默认) wrap  wrap-reverse 默认不换行 缩小
    * flex-flow
      是flex-direction和flex-wrap的简写 row nowrap(默认)
    * justify-content
      主轴上的对齐方式 flex-start(默认值 左对齐) flex-end center space-between space-around
    * align-items
      垂直轴上的对齐方式 flex-start flex-end center baseline(第一行文字的基线对齐) stretch(默认，元素没设置高或者设置为auto，则元素的高为父容器的高度)
    * align-content
      当垂直轴不止一根时，设置垂直轴上的对齐方式 flex-start flex-end center space-between space-around stretch
*  item的属性
    * order
      默认为0，必须是整数，越小越靠前 可以为负值
    * align-self
      设置自身在垂直轴上的对齐方式，会覆盖容器的设置
    * flex-grow
      放大，即有多余的空间时元素放大比例，默认是0,即使剩余空间也不不放大。可能的值为整数，表示不同item的放大比例
    * flex-shrink
      缩小，即空间不足时元素的缩小比例，默认是1,空间不足时自动缩小。 其可能的值为整数，表示不同item的缩小比例
    * flex-basis
      项目在主轴上占据的长度，默认是auto
    * flex
      * flex-grow  flex-shrink flex-basis 的缩写，默认是0 1 auto。 即不放大 缩小长度自动
      * 当 flex 取值为 none，则计算值为 0 0 auto
      * 当 flex 取值为 auto，则计算值为 1 1 auto
      * 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%
      * 当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1
      * 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%

### 8、媒体查询 @media
  ```css
  @media not|only mediatype and (media feature) {
      css code;
  }
  ```

### 9、盒模型 content-box
*  控制盒子模型的属性是box-sizing，默认值是content-box。
*  属性值为content-box的时候是标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin
*  属性值为border-box的时候是IE盒子模型：宽度=内容宽度（content+border+padding）+ margin

### 10、过渡和动画的区别是什么？
*  过渡只能指定元素的初始状态和结束状态，而动画可以控制多个阶段。
*  过渡需要有触发条件，而动画不需要触发条件。
*  动画的子属性更多可以控制循环次数 方向等等。

### 11、流式布局与响应式布局的区别是什么？
*  流式布局也就是百分比布局，通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。
*  响应式布局是利用Media Query(媒体查询)。
*  响应式设计就是可根据不同设备的可视区域改变网页布局，展现不同设计风格，力求在当前设备中达到最完美的效果减少用户浏览网页的额外操作。
