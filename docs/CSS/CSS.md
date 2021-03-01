## CSS 文档

[菜鸟教程 css 文档](https://www.runoob.com/css/css-tutorial.html)

[css 文档](https://www.xp.cn/css3/)

## CSS 知识点

### CSS 是什么？

CSS 是层叠样式表。

### CSS 的分类有哪些？

- 行内样式 写在 html 标签里的 style 属性里面的样式。
- 内嵌样式 写在 html 文件 style 标签里面的样式。
- 链接样式 使用 link 标签引入的样式 `<link type="text/css" href="" rel="stylesheet"/>`。
- 导入样式 使用@import url("")导入的样式。

### CSS 中 link 和@import 的区别是？

- link 属于 HTML 标签，而@import 是 CSS 提供的，不属于 HTML 标签。
- 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载。
- import 只在 IE5 以上才能识别，而 link 是 HTML 标签，无兼容问题。
- link 方式的样式的权重高于@import 的权重。

### CSS 哪些属性可以继承？哪些属性不能继承？

- 与元素外观相关的属性能被继承(如颜色 字体 背景 对齐方式等)。比如 font-size、font-family、color、background-color、visibility、opacity、text-align、text-shadow、line-height、word-spacing、letter-spacing、cursor

- 不能继承的属性 border, padding, margin, width, height

- 当一个属性不是继承属性时，可以使用 inherit 关键字指定一个属性应从父元素继承它的值，inherit 关键字用于显式地指定继承性，可用于任何继承性/非继承性属性。

### 为什么要初始化的 CSS？

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。

### 浮动怎么使用？浮动带来的影响和清除浮动的方式有哪些？

- float: left/right 开启左右浮动。
  - 不管是块级元素还是行内元素，设置浮动后的 display 属性值是 block。
  - 直到遇到另一个浮动元素或者遇到它外边缘的包含框或者块级元素才不会向上浮动。
- 优点：
  - 图文混排的时候可以很好的使文字环绕在图片周围。
  - 可以解决 inline-block 元素空白间隙的问题。
- 影响：
  - 元素会脱离文档流，会影像内联元素的布局。
  - 浮动会导致父元素撑不开。
- 清除浮动的方式：
  - 浮动元素后加空 div 标签 并添加样式 clear:both，或者看具体情况也可以使用 clear:left 或者 clear:right。
  - 父元素使用伪类 parent:after{content: ''; clear: both; display: block;}。clear 属性只有块级元素才有效的。所以需要 display:block;
  - 父元素添加{overflow: hidden/auto;} 开启 bfc，这个可以解决父元素高度塌陷的问题。
  - 老版本 ie 浏览器还可以使用 zoom:1 的清除浮动。原理是当设置了 zoom 的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变 zoom 值时其实也会发生重新渲染，运用这个原理，也就解决了 ie 下子元素浮动时候父元素不随着自动扩大的问题。

### 什么是 bfc，怎么创建 bfc？IFC 是什么？

- BFC 是一个独立的布局环境，其中的元素布局是不受外界的影响也不会影响外部元素。
- 最常见的是 bfc 可以解决外边距重叠的问题，解决浮动元素不撑开父元素的问题。
- 满足以下四条中的任意一条就可以开启 bfc

  - 1、float 的值是 right 或 left。
  - 2、position 的值是 absolute 或者 fixed。
  - 3、display 的值是 inline-block、table-cell、flex、table-caption 或者 inline-flex
  - 4、overflow 的值是 hidden 或 auto

- IFC 指的是行级格式化上下文，它有这样的一些布局规则：
  - （1） 行级上下文内部的盒子会在水平方向，一个接一个地放置。
  - （2） 当一行不够的时候会自动切换到下一行。
  - （3） 行级上下文的高度由内部最高的内联盒子的高度决定。

### CSS 为什么是从右往左解析的？

因为我们写样式的时候是范围由大到小比如 div .box1 先从右边就能过滤掉一大部分不符合条件的元素。CSS 中更多的选择器是不会匹配的，所以在考虑性能问题时，需要考虑的是如何在选择器不匹配时提升效率。从右向左匹配就是为了达成这一目的的，通过这一策略能够使得 CSS 选择器在不匹配的时候效率更高。

比如选择器 #markdown .content h3 先找到 DOM 中的所有 h3 元素，再过滤掉祖先元素不是.content 的，最后过滤掉.content 的祖先不是#markdown 的。

### CSS 隐藏元素的几种方式及区别是什么？

- display: none
  元素彻底消失，不占据空间，不会触发点击事件,但 f12 还是能看到代码。
- visibility: hidden
  元素消失，但仍占据空间，不会触发点击事件。
- opacity: 0
  元素消失，但仍占据空间，会触发点击事件。
- 其他脑洞方法
  - 设置元素的 position 与 left，top，bottom，right 等，将元素移出至屏幕外。
  - 设置元素的 position 与 z-index，将 z-index 设置成尽量小的负数。
  - transform: scale(0,0) 缩小为 0。

### 两个类连在一起是什么意思?

表示一个元素同时具备这两个类的时候应用里面的样式。
比如`<p class="c1"></p>和<span class="c1 c2"></span>`当我设置.c1.c2 样式的时候，是给 span 设置样式

### CSS 加载会阻塞 DOM 树的解析和渲染吗?

- css 并不会阻塞 DOM 树的解析。
- css 加载会阻塞 DOM 树渲染。
- css 加载会阻塞后面 js 语句的执行。
- js 执行会阻塞 DOM 树的解析和渲染。

### CSS 有哪些方法？

- calc(这里面可以进行`+-*/`运算)。
- attr()获取某个属性的值

```css
a:after {
  content: attr(href);
}
```

- min(x, y, z) 取最小值
- max(x, y, z) 取最大值

### web 安全色有哪些？

使用 00 33 66 99 CC FF 任意三个组合起来的就称为 web 安全色，在各个平台上渲染出来不会有色差，所以有 6 的 3 次方种，总共 216 个安全色。

### 在 css 中使用 background:transparent 与 opacity:0 有什么区别?

- transparent 相当于 rgba(0,0,0,0),需要与 background 或 color 配合使用,他仅仅是将元素的背景或颜色设为透明，而元素中的内容还能显示出来。
- opacity 会把元素和内容当成一个整体，当设为 0 的时候两者都会透明。

### line-height 如果使用百分比的话是根据什么计算大小的？

line-height 如果使用百分比的话是根据字体大小计算的。
例如 font-size:18px;line-height:50%;则 line-height 是 9px;

### 绝对定位和浮动有哪些异同?

- 绝对定位和浮动都会使元素脱离正常的文档流，改变元素盒模型，将元素变为块级元素，同时都能创建 BFC。
- 两者的包含块不同，绝对定位是根据离他最近的 position 属性不为 static 的祖先元素，而浮动元素是根据最近的块级祖先元素。绝对定位相对元素的边界是 padding box 而不是 content box。
- 绝对定位不会影响兄弟元素，浮动会影响兄弟元素的样式。
- 绝对定位后可以设置元素的 z-index，而浮动不能。默认是 0。

### CSS 定义通用字体都有什么？

- serif 衬线字体族 具有末端加粗、扩张或尖细末端，或以实际的衬线结尾的一类字体 典型的例子是宋体。
- sans-serif 无衬线字体族 字体比较圆滑，线条粗线均匀 典型的例子是楷体。
- monospace 等宽字体族。
- cursive 手写字体族 这类字体的字就像手写的一样。
- fantasy 梦幻字体族 主要用在图片中，字体看起来很艺术，实际网页上用得不多。

### @font-face 有什么作用？怎么使用？

- css 原先只能使用操作系统上安装的字体，自从引入了@font-face 后，就打破了这个限制，允许使用在线字体。
- @font-face 能将放置在服务器上的自定义字体嵌入到页面中。

```css
定义： @font-face {
  font-family: name;
  src: url(xxx);
}
使用：font-family: name;
```

### 谈谈 CSS 预处理器和后置处理器？

- css 预处理器能为 css 增加编程特性，解决了 css 难以复用，代码冗余，可维护性低等问题。常用的有 less scss。
- 后处理器在完成的样式表中根据 css 规范处理 css，比如 postcss 给 css 增加各私有浏览器前缀，css 代码压缩等。

### 重置（resetting）CSS 和 标准化（normalizing）CSS 的区别是什么？

- 重置意味着除去所有的浏览器默认样式。对于页面所有的元素，像 margin、padding、font-size 这些样式全部置成一样。你将必须重新定义各种元素的样式。
- 标准化没有去掉所有的默认样式，而是保留了有用的一部分，同时还纠正了一些常见错误。

### 元素竖向的百分比设定是相对于容器的高度吗？

块级元素的宽度默认是父元素宽度，高度由内容撑开。设置宽度高度百分比是依据父元素的宽高来计算。
但是 padding-top padding-bottom margin-top margin-bottom 这些竖向边距属性的百分比不是依据父元素高度计算的，而是依据父元素的宽度计算的。

### font-style 的 italic 和 oblique 在浏览器上看来都来斜体，请问有什么区别？

italic 是字体（如宋体、微软雅黑、楷体...）的一个属性，font-style:italic 是使用了字体的 italic 属性。
但是，并不是所有的字体都有 italic 属性，这时候就得用到 oblique 属性了。
font-style:oblique 是单纯的使文字倾斜，不管该字体有没有 italic 属性。

### 什么是响应式设计？响应式设计的基本原理是什么？

响应式网站设计是一个网站能够兼容多个终端，原理是通过媒体查询(media)检测不同的设备屏幕尺寸做处理。

### png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？

（1）BMP，是无损的、既支持索引色也支持直接色的、点阵图。这种图片格式几乎没有对数据进行压缩，所以 BMP 格式的图片通常具有较大的文件大小。

（2）GIF 是无损的、采用索引色的、点阵图。采用 LZW 压缩算法进行编码。文件小，是 GIF 格式的优点，同时，GIF 格式还具有支持动画以及透明的优点。但，GIF 格式仅支持 8bit 的索引色，所以 GIF 格式适用于对色彩要求不高同时需要文件体积较小的场景。

（3）JPEG/JPG 是有损的、采用直接色的、点阵图。JPEG 的图片的优点，是采用了直接色，得益于更丰富的色彩，JPEG 非常适合用来存储照片，与 GIF 相比，JPEG 不适合用来存储企业 Logo 、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较 GIF 更大。

（4）PNG-8 是无损的、使用索引色的、点阵图。PNG 是一种比较新的图片格式，PNG-8 是非常好的 GIF 格式替代者，在可能的情况下，应该尽可能的使用 PNG-8 而不是 GIF，因为在相同的图片效果下，PNG-8 具有更小的文件体积。除此之外，PNG-8 还支持透明度的调节，而 GIF 并不支持。现在，除非需要动画的支持，否则我们没有理由使用 GIF 而不是 PNG-8。

（5）PNG-24 是无损的、使用直接色的、点阵图。PNG-24 的优点在于，它压缩了图片的数据，使得同样效果的图片，PNG-24 格式的文件大小要比 BMP 小得多。当然，PNG24 的图片还是要比 JPEG、GIF、PNG-8 大得多。

（6）SVG 是无损的、矢量图。SVG 是矢量图。这意味着 SVG 图片由直线和曲线以及绘制它们的方法组成。当你放大一个 SVG 图片的时候，你看到的还是线和曲线，而不会出现像素点。这意味着 SVG 图片在放大时，不会失真，所以它非常适合用来绘制企业 Logo、Icon 等。

- （7）WebP 是谷歌开发的一种新图片格式，WebP 是同时支持有损和无损压缩的、使用直接色的、点阵图。从名字就可以看出来它是为 Web 而生的，什么叫为 Web 而生呢？就是说相同质量的图片，WebP 具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。

  - 在无损压缩的情况下，相同质量的 WebP 图片，文件大小要比 PNG 小 26%；
  - 在有损压缩的情况下，具有相同图片精度的 WebP 图片，文件大小要比 JPEG 小 25%~34%；
  - WebP 图片格式支持图片透明度，一个无损压缩的 WebP 图片，如果要支持透明度只需要 22%的格外文件大小。
  - 但是目前只有 Chrome 浏览器和 Opera 浏览器支持 WebP 格式，兼容性不太好。

### 浏览器如何判断是否支持 webp 格式图片

（1）宽高判断法。通过创建 image 对象，将其 src 属性设置为 webp 格式的图片，然后在 onload 事件中获取图片的宽高，如果能够获取，则说明浏览器支持 webp 格式图片。如果不能获取或者触发了 onerror 函数，那么就说明浏览器不支持 webp 格式的图片。

（2）canvas 判断方法。我们可以动态的创建一个 canvas 对象，通过 canvas 的 toDataURL 将设置为 webp 格式，然后判断返回值中是否含有 image/webp 字段，如果包含则说明支持 WebP，反之则不支持。

### content

content 属性生成的对象称为“匿名替换元素”。

- （1）我们使用 content 生成的文本是无法选中、无法复制的，好像设置了 userselect:none 声明一般，但是普通元素的文本却可以被轻松选中。同时，content 生成的文本无法被屏幕阅读设备读取，也无法被搜索引擎抓取，因此，千万不要自以为是地把重要的文本信息使用 content 属性生成，因为这对可访问性和 SEO 都很不友好。
- （2）content 生成的内容会被无视， :empty 伪类依然会生效。
- （3）content 动态生成值 js 无法获取。

### border 的特殊性？

（1）border-width 却不支持百分比。

（2）border-style 的默认值是 none，有一部分人可能会误以为是 solid。这也是单纯设置 border-width 或 border-color 没有边框显示的原因。

（3）border-style:double 的表现规则：双线宽度永远相等，中间间隔 ±1 份 border-width。

（4）border-color 默认颜色就是 color 色值。

（5）默认 background 背景图片是相对于 padding box 定位的。

### width:auto 和 width:100% 的区别？

- width:100% 会使元素 content box 的宽度等于父元素的 content box 的宽度。如果元素有内外边距或者边框则会超出父元素。
- width:auto 会使元素 border box 的宽度等于父元素的 content box 的宽度。不管有没有边距或边框始终包含在父元素内。

### 绝对定位元素与非绝对定位元素的百分比计算的区别

- 绝对定位元素的宽高百分比是相对于临近的 position 不为 static 的祖先元素的 padding box 来计算的。
- 非绝对定位元素的宽高百分比则是相对于父元素的 content box 来计算的。

### 'display'、'position' 和 'float' 的相互关系？

- display 属性是否为 none，如果为 none ，则 position 和 float 属性的值不影响元素最后的表现。
- 如果 display 属性值不为 none 则判断 position 的值是否为 fixed 或 absolute，如果为这其中的两个值则 display 更改为 block，float 不起作用。
- 如果 display 属性值不为 none 并且 position 的值不为 fixed 或 absolute，则 float 起作用，display 自动为 block。并且如果 position 为 relative 则是相对浮动后的位置进行相对定位。

### 简单说一下 css3 的 all 属性。

- all 属性实际上是所有 CSS 属性的缩写，除了 unicode-bidi 和 direction 这两个 css 属性。属性值有三个。
  - initial 所有的属性都用初始值
  - inherit 所有的属性值都用继承值
  - unset 设置了忽略的属性忽略掉，没忽略的属性具有继承特性的使用继承值，没有继承特性的使用初始值。

### 为什么 height:100% 会无效？

对于普通文档流中的元素，百分比高度值要想起作用，其父级必须有一个可以生效的高度值。明确的高度值。

原因是如果包含块的高度没有显式指定（即高度由内容决定），并且该元素不是绝对定位，则计算值为 auto，因为解释成了 auto，所以无法参与计算。

### min-width/max-width 和 min-height/max-height 属性间的覆盖规则？

（1）max-width 会覆盖 width，即使 width 是行类样式或者设置了 !important。

（2）min-width 会覆盖 max-width，此规则发生在 min-width 和 max-width 冲突的时候。

### 隐藏元素的 background-image 到底加不加载？

（1）元素的背景图片

    元素本身设置 display:none 会请求图片
    父级元素设置 display:none 不会请求图片，设置visibility:hidden会请求图片。
    样式没有元素使用，不会请求
    :hover 样式下，触发时请求

（2）img 标签图片

    任何情况下都会请求图片

### white-space word-break word-wrap 的区别是什么？

```
white-space 顾名思义 这个属性是用来控制空白字符的显示的 normal | nowrap | pre | pre-wrap | pre-line。默认是normal
  normal：默认处理方式。不保留文字最前面的空格，其它空格做一个空格处理。会换行
  pre：保留文字的格式但是不会换行
  nowrap：不保留文字最前面的空格，其它空格做一个空格处理。不换行
  pre-wrap：保留文字的格式但是会换行
  pre-line：不保留文字最前面的空格，其它空格做一个空格处理。会换行
word-break 顾名思义 这个属性控制单词如何被拆分换行的 normal | break-all | keep-all
  normal 使用浏览器默认的换行规则。
  break-all 所有单词或中文句子碰到边界一律拆分换行
  keep-all 所有单词或中文句子一律不拆分换行
word-wrap 这个属性也是控制单词如何被拆分换行的 作为word-break的互补 normal | break-word
  normal 默认 一个汉字(一个单词)如果长了不会换行 会溢出。
  break-word 一个汉字(一个单词)如果长了会换行。
```

### css 变量

```css
/* 全局变量 */
:root {
  --main-bg-color: coral;

  --box {
    width: 100px;
    height: 100px;
  }
}

.a {
  /* 写在类里面的是局部变量 */
  --color: red;
}

.b {
  /* 使用 第一个参数为自定义属性名，第二个参数用作缺省值*/
  color: var(--main-bg-color, "red");
  /* 使用@apply 引用一个类 类似预处理器的混合 */
  @apply --box;
}
```

CSS 变量类似于我们在 SCSS、LESS 中定义的变量，但前者支持通过 JS 来控制变量的值，以--开头，(e.g. --main-color: #b4a078)，通过 var(--main-color)来引用。

var()函数接受两个参数（e.g. var(--main-color, gray)），第一个参数为自定义属性名，第二个参数用作缺省值。

### css 的模块化

有两种方案

第一种 随机转换类名，就是把你定义的类名按一定规则随机转换成一长串字符。这样类名就不会重复，就达到了模块化效果。

第二种 给元素添加属性，就是把你的元素添加随机属性，选择器就变成类名+[属性名]这样类名就不会重复，就达到了模块化效果。

#### 在 vue 中使用两种方式

```html
<!-- 第一种 随机转换类名 使用module关键字  -->
<!-- 定义  -->
<style module>
  .a {
    color: red;
  }
</style>
<!-- 使用  -->
<div :class="$style.a"></div>

<!-- 第二种 给元素添加属性  -->
<!-- 定义  -->
<style scoped>
  .a {
    color: red;
  }
</style>
<!-- 使用  -->
<div class="a"></div>
;
```

#### 在 react 中的使用

```html
<!-- 第一种 随机转换类名  -->
<!-- 在webpack构建css的css-loader中打开modules -->
<!-- options: {
  modules: true
} -->

<!-- 使用 -->
import style from './a.css'
<div className="{style.a}"></div>
```
