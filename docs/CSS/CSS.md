### 1、CSS是什么？
  CSS是层叠样式表。

### 2、CSS的分类有哪些？
*  行内样式 写在html标签里的style属性里面的样式。
*  内嵌样式 写在html文件style标签里面的样式。
*  链接样式 使用link标签引入的样式 `<link type="text/css" href="" rel="stylesheet"/>`。
*  导入样式 使用@import url("")导入的样式。

### 3、CSS中 link 和@import 的区别是？
*  link属于HTML标签，而@import是CSS提供的，不属于HTML标签。
*  页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载。
*  import只在IE5以上才能识别，而link是HTML标签，无兼容问题。
*  link方式的样式的权重高于@import的权重。

### 4、CSS哪些属性可以继承？
  与元素外观相关的属性能被继承(如颜色 字体 背景 对齐方式等)。
  比如 font-size、font-family、color、background-color、visibility、opacity

### 5、为什么要初始化的CSS？
  因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

### 6、浮动怎么使用？浮动带来的影响和清除浮动的方式有哪些？
*  float: left/right 开启左右浮动。不管是块级元素还是行内元素，设置浮动后的display属性值是block。
*  影响：
    * 元素会脱离文档流，会影像后面元素的布局。
    * 浮动会导致父元素撑不开。
*  清除浮动的方式：
    * 浮动元素后加空div标签 并添加样式clear:both，或者看具体情况也可以使用clear:left或者clear:right。

### 7、什么是bfc，怎么创建bfc？
*  BFC是一个独立的布局环境，其中的元素布局是不受外界的影响。
*  最常见的是bfc可以解决外边距重叠的问题，解决浮动元素不撑开父元素的问题。
*  满足以下四条中的任意一条就可以开启bfc
    * 1、float的值是right或left。
    * 2、position的值是absolute或者fixed。
    * 3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex
    * 4、overflow的值是hidden或auto

### 8、CSS为什么是从右往左解析的？
  因为我们写样式的时候是范围由大到小比如div .box1 先从右边就能过滤掉一大部分不符合条件的元素。
  CSS中更多的选择器是不会匹配的，所以在考虑性能问题时，需要考虑的是如何在选择器不匹配时提升效率。
  从右向左匹配就是为了达成这一目的的，通过这一策略能够使得CSS选择器在不匹配的时候效率更高。
  比如选择器 #markdown .content h3 先找到DOM中的所有h3元素，再过滤掉祖先元素不是.content的，最后过滤掉.content的祖先不是#markdown的。

### 9、CSS隐藏元素的几种方式及区别是什么？
*  display: none
    元素彻底消失，不占据空间，不会触发点击事件,但f12还是能看到代码。
*  visibility: hidden
    元素消失，但仍占据空间，不会触发点击事件。
*  opacity: 0
    元素消失，但仍占据空间，会触发点击事件。
*  其他脑洞方法
    * 设置元素的position与left，top，bottom，right等，将元素移出至屏幕外。
    * 设置元素的position与z-index，将z-index设置成尽量小的负数。
    * transform: scale(0,0) 缩小为0。

### 10、两个类连在一起是什么意思?
  表示一个元素同时具备这两个类的时候应用里面的样式。
  比如`<p class="c1"></p>和<span class="c1 c2"></span>`当我设置.c1.c2样式的时候，是给span设置样式

### 11、CSS加载会阻塞DOM树的解析和渲染吗?
*  css并不会阻塞DOM树的解析。
*  css加载会阻塞DOM树渲染。
*  css加载会阻塞后面js语句的执行。
*  js执行会阻塞DOM树的解析和渲染。

### 12、CSS的计算方法叫什么，怎么使用？
  calc(这里面可以进行+-*/运算)。

### 13、浏览器私有前缀都有哪些？
*  -webkit- chrome浏览器 safari浏览器
*  -moz- firefox浏览器
*  -o- opera浏览器
*  -ms- ie浏览器

### 14、web安全色有哪些？
  使用00 33 66 99 CC FF任意三个组合起来的就称为web安全色，在各个平台上渲染出来不会有色差，所以有6的3次方种，总共216个安全色。

### 15、在css中使用background:transparent与opacity:0有什么区别?
*  transparent相当于rgba(0,0,0,0),需要与background或color配合使用,他仅仅是将元素的背景或颜色设为透明，而元素中的内容还能显示出来。
*  opacity会把元素和内容当成一个整体，当设为0的时候两者都会透明。

### 16、line-height如果使用百分比的话是根据什么计算大小的？
  line-height如果使用百分比的话是根据字体大小计算的。
  例如font-size:18px;line-height:50%;则line-height是9px;

### 17、绝对定位和浮动有哪些异同?
*  绝对定位和浮动都会使元素脱离正常的文档流，改变元素盒模型，将元素变为块级元素，同时都能创建BFC。
*  两者的包含块不同，绝对定位是根据离他最近的position属性不为static的祖先元素，而浮动元素是根据最近的块级祖先元素。
*  绝对定位不会影响兄弟元素，浮动会影响兄弟元素的样式。
*  绝对定位后可以设置元素的z-index，而浮动不能。默认是0。

### 18、CSS定义通用字体都有什么？
*  serif 衬线字体族 具有末端加粗、扩张或尖细末端，或以实际的衬线结尾的一类字体 典型的例子是宋体。
*  sans-serif 无衬线字体族 字体比较圆滑，线条粗线均匀 典型的例子是楷体。
*  monospace 等宽字体族。
*  cursive 手写字体族 这类字体的字就像手写的一样。
*  fantasy 梦幻字体族 主要用在图片中，字体看起来很艺术，实际网页上用得不多。

### 19、@font-face有什么作用？怎么使用？
*  css原先只能使用操作系统上安装的字体，自从引入了@font-face后，就打破了这个限制，允许使用在线字体。
*  @font-face能将放置在服务器上的自定义字体嵌入到页面中。
  ```css
  定义：
    @font-face{
      font-family: name;
      src:url(xxx);
    }
  使用：
    font-family: name;
  ```

### 20、谈谈CSS预处理器和后置处理器？
*  css预处理器能为css增加编程特性，解决了css难以复用，代码冗余，可维护性低等问题。常用的有less scss。
*  后处理器在完成的样式表中根据css规范处理css，比如postcss 给css增加各私有浏览器前缀，css代码压缩等。

### 21、重置（resetting）CSS 和 标准化（normalizing）CSS 的区别是什么？
*  重置意味着除去所有的浏览器默认样式。对于页面所有的元素，像margin、padding、font-size这些样式全部置成一样。你将必须重新定义各种元素的样式。
*  标准化没有去掉所有的默认样式，而是保留了有用的一部分，同时还纠正了一些常见错误。

### 22、元素竖向的百分比设定是相对于容器的高度吗？
  块级元素的宽度默认是父元素宽度，高度由内容撑开。设置宽度高度百分比是依据父元素的宽高来计算。
  但是padding-top padding-bottom margin-top margin-bottom这些竖向边距属性的百分比不是依据父元素高度计算的，而是依据父元素的宽度计算的。

### 23、font-style的italic和oblique在浏览器上看来都来斜体，请问有什么区别？
  italic是字体（如宋体、微软雅黑、楷体...）的一个属性，font-style:italic是使用了字体的italic属性。
  但是，并不是所有的字体都有italic属性，这时候就得用到oblique属性了。
  font-style:oblique是单纯的使文字倾斜，不管该字体有没有italic属性。
