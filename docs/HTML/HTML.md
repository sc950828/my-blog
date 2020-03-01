### 1、HTML是什么？
  超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。

### 2、标准的HTML文档基本结构是什么？
  标准的HTML文档基本结构包括文档申明(<!DOCTYPE html>)、html标签、head标签、body标签。

### 3、HTML文档的后缀有哪些？
  有.html或者.htm

### 4、META网页元数据
  ```html
  1.name用来定义属性，content用来定义该属性的值.
    常用的name有:
      application-name：web应用程序名称
      author：文档作者
      description：文档描述
      keywords：文档关键字，多个关键字之间用逗号隔开
      viewport：主要用于移动设备，可以设置浏览器中的视口
        width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度。
        height：和 width 相对应，指定高度。
        initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
        maximum-scale：允许用户缩放到的最大比例。
        minimum-scale：允许用户缩放到的最小比例。
        user-scalable：用户是否可以手动缩放。yes/no

  2.http-equiv提供了一些程序指令，用于模拟http首部，用来定义属性，content用来定义该属性的值
    http-equiv有:
      content-type：定义文档类型与字符编码 <meta http-equiv="content-type" content="text/html;chartset=UTF-8">
      default-style：首选样式表
      refresh：执行重载或重定向
      X-UA-Compatible：怎么渲染 <meta http-equiv="X-UA-Compatible" content="IE=edge">#以上代码告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面。

  3.HTML5新增的设置网页编码的方式 <meta chartset="UTF-8">
  ```

### 5、DOCTYPE的作用，标准模式与怪异模式的特点?
*  DOCTYPE确保不同浏览器以相同方式渲染文档，没写或写错浏览器会以怪异模式加载。
*  标准模式的js运行和排版是按照浏览器支持的最高标准的。怪异模式就是兼容性模式，是使用浏览器自己的方式解析执行代码。
*  怪异模式的特点：会触发IE模型，元素的大小等于内容+padding+border。

### 6、事件模型是什么？
  w3c中定义的事件发生的过程的3个阶段： 捕获阶段（capturing）、目标阶段（targetin）、冒泡阶段（bubbling）

### 7、什么是渐进增强和优雅降级？
*  渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
*  优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

### 8、块级元素、行内元素、空元素、置换元素都有什么特点？
*  块级元素 div 独占一行。
*  行内元素 span 不能设置宽高 元素大小由内容决定。 不能设置上下外边距，能设置上下内边距但元素大小不会变。能设置左右内外边距。
*  空元素 br hr 没有实际内容。
*  替换元素也叫置换元素指内容不包含在文档中的元素如img video input textarea等。

### 9、天生的inline-block元素有哪些？
  ```html
  <input> 、<img> 、<button> 、<textarea>
  ```

### 10、常用的格式文本标签有哪些？
  ```html
  <em> 显示斜体
  <i> 显示斜体
  <strong> 显示粗体
  <b> 显示粗体
  <big> 较大字体
  <small> 较小字体
  <sup> 上标文本
  <sub> 下标文本
  <ins> 下划线文本
  <del> 删除文本
  <bdo dir="rtl / ltr"> 定义文本显示方向 右到左或者左到右
  ```

### 11、锚点是什么？怎么使用？
*  锚点能定位到HTML文档中的特定位置，锚点既可以在当前域名下也可以在其他域名下(href="www.baidu.com#xxx")
*  使用：
    * 元素用id标记，作为锚点。
    * a元素href属性链接后面加上#id名，点击即可跳转到对应id元素的位置。

### 12、a元素常用属性？
*  target属性
    * _self 当前窗口打开链接。默认。
    * _blank 新窗口打开链接。
    * _parent 父窗口打开链接，没有父窗口在当前窗口打开链接。
    * _top 在最顶层窗口打开链接，没有顶级窗口的时候在当前窗口打开链接。
*  download属性
    * 规定下载文件的文件名称，不包括后缀。
*  hreflang定义链接资源所使用的语言。

### 13、src和href的区别？
*  src是链接当前项目里面的资源，浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕。
*  href是链接外部资源，当浏览器遇到href会并行下载资源并且不会停止对当前文档的处理。
