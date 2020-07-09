### 1、HTML 是什么？

超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。

### 2、标准的 HTML 文档基本结构是什么？

标准的 HTML 文档基本结构包括文档申明(<!DOCTYPE html>)、html 标签、head 标签、body 标签。

### 3、HTML 文档的后缀有哪些？

有.html 或者.htm。

### 4、META 网页元数据

- meta 用来定义网页的元数据，使用 name 或 http-equiv 来定义属性，content 用来定义该属性的值.
- 常用的 name 有:
  - application-name：web 应用程序名称。
  - author：文档作者。
  - description：文档描述。
  - keywords：文档关键字，多个关键字之间用逗号隔开。
  - viewport：主要用于移动设备，可以设置浏览器中的视口
    - width：控制 viewport 宽度的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度。
    - height：和 width 相对应，指定高度。
    - initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。0-10 之间
    - maximum-scale：允许用户缩放到的最大比例。0-10 之间
    - minimum-scale：允许用户缩放到的最小比例。 0-10 之间
    - user-scalable：用户是否可以手动缩放。yes/no
- http-equiv 提供了一些程序指令，用于模拟 http 首部。
- http-equiv 有:
  - content-type：定义文档类型与字符编码。`<meta http-equiv="content-type" content="text/html;chartset=UTF-8" />`。
  - default-style：首选样式表。
  - refresh：执行重载或重定向。
  - X-UA-Compatible：`<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />`优先使用 IE 最新版本和 Chrome
- HTML5 新增的设置网页编码的方式 `<meta chartset="UTF-8" />`。

### 5、DOCTYPE 的作用，标准模式与怪异模式的特点?

- DOCTYPE 告知浏览器的解析器用什么文档标准来解析这个文档，没写或写错浏览器会以怪异模式加载。
- 标准模式的 js 运行和排版是按照浏览器支持的最高标准的。怪异模式就是兼容性模式，是使用浏览器自己的方式解析执行代码。
- 怪异模式的特点：会触发 IE 模型，元素的大小等于内容+padding+border。

### 6、事件模型是什么？

w3c 中定义的事件发生的过程的 3 个阶段： 捕获阶段（capturing）、目标阶段（targetin）、冒泡阶段（bubbling）。

### 7、什么是渐进增强和优雅降级？

- 渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

### 8、块级元素、行内元素、空元素、置换元素都有什么特点？

- 块级元素 div 独占一行。块级元素能包含文本、行内元素和其他块级元素。常见的块级元素有 div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p
- 行内元素 span 不能设置宽高 元素大小由内容决定。 不能设置上下外边距，能设置上下内边距但元素大小不会变。能设置左右内外边距。行内元素只能包含文本或其他行内元素。常见的元素有 a b span strong sub sup label select textarea img input button
- 空元素 br hr 没有实际内容。
- 替换元素也叫置换元素指内容不包含在文档中的元素。或者说是通过修改某个属性值呈现的内容就可以被替换的元素。因此，`<img>、<object>、<video>、<iframe>` 或者表单元素 `<textarea>` 和 `<input>`和 `<select>` 都是典型的替换元素。

### 9、天生的 inline-block 元素有哪些？

```html
<input /> 、<img /> 、<button></button> 、<textarea></textarea>
```

### 10、常用的格式文本标签有哪些？

```html
<em>em 斜体</em>
<i>i 斜体 html5不推荐使用</i>
<strong>strong 粗体</strong>
<b>b 粗体 html5不推荐使用</b>
<big>big 较大字体</big>
<small>small 较小字体</small>
<sup>sup 上标</sup>
<sub>sub 下标文本</sub>
<ins>ins 下划线文本</ins>
<del>del 删除线文本</del>
<bdo dir="ltr">bdo 控制文本显示方向，默认从左到右</bdo>
<bdo dir="rtl">bdo 控制文本显示方向，默认从左到右</bdo>
```

### 11、锚点是什么？怎么使用？

- 锚点能定位到 HTML 文档中的特定位置，锚点既可以在当前域名下也可以在其他域名下(href="www.baidu.com#xxx")
- 使用：
  - 元素用 id 标记，作为锚点。
  - a 元素 href 属性链接后面加上#id 名，点击即可跳转到对应 id 元素的位置。

### 12、a 元素常用属性？

    target 属性
      _self 当前窗口打开链接。默认。
      _blank 新窗口打开链接。
      _parent 父窗口打开链接，没有父窗口在当前窗口打开链接。
      _top 在最顶层窗口打开链接，没有顶级窗口的时候在当前窗口打开链接。
    download 属性
      规定下载文件的文件名称，不包括后缀。
    hreflang 定义链接资源所使用的语言。

### 13、src 和 href 的区别？

- src 是链接当前项目里面的资源，浏览器解析到 src ，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕。
- href 是链接外部资源，当浏览器遇到 href 会并行下载资源并且不会停止对当前文档的处理。

### 14、SGML 、 HTML 、XML 和 XHTML 的区别？

- SGML 是标准通用标记语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。
- HTML 是超文本标记语言，主要是用于规定怎么显示网页。
- XML 是可扩展标记语言是未来网页语言的发展方向，XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多，而 HTML 的标签都是固定的而且数量有限。
- XHTML 也是现在基本上所有网页都在用的标记语言，他其实和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML 更严格，比如标签必须都用小写，标签都必须有闭合标签等。

### 15、 DTD 介绍？

- DTD（ Document Type Definition 文档类型定义）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。
- DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。

### 16、前端需要注意哪些 SEO ？

- （1）合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过 2 次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可。

- （2）语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页。

- （3）重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容肯定被抓取。

- （4）重要内容不要用 js 输出：爬虫不会执行 js 获取内容。

- （5）少用 iframe：搜索引擎不会抓取 iframe 中的内容。

- （6）非装饰性图片必须加 alt。

- （7）提高网站速度：网站速度是搜索引擎排序的一个重要指标。

### 17、iframe 有那些缺点？

- iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。
- 主要缺点有：
  - （1）iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 src 可以避免这种阻塞情况。
  - （2）搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。
  - （3）iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
  - （4）浏览器的后退按钮失效。
  - （5）小型的移动设备无法完全显示框架。

### 18、如何实现浏览器内多个标签页之间的通信?

- （1）使用 WebSocket，通信的标签页连接同一个服务器，发送消息到服务器后，服务器推送消息给所有连接的客户端。

- （2）使用 SharedWorker （只在 chrome 浏览器实现了），两个页面共享同一个线程，通过向线程发送数据和接收数据来实现标签页之间的双向通行。

- （3）可以调用 localStorage 本地存储方式，localStorge 另一个浏览上下文里被添加、修改或删除时，它都会触发一个 storage 事件，我们通过监听 storage 事件，控制它的值来进行页面信息通信。

### 19、title 与 h1 与 img 的 alt 的区别？

- title 通常当鼠标滑动到元素上的时候显示，title 属性没有明确意义只表示是个标题。
- h1 则表示层次明确的标题，对页面信息的抓取也有很大的影响。对 seo 有很大帮助。
- alt 是 `<img>` 的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。

### 20、对 web 标准的可用性、可访问性的、可维护性的理解

- 可用性（Usability）：产品是否容易上手，用户能否完成任务，效率如何，以及这过程中用户的主观感受可好，是从用户的角度来看产品的质量。可用性好意味着产品质量高，是企业的核心竞争力。

- 可访问性（Accessibility）：Web 内容对于残障用户的可阅读和可理解性。

- 可维护性（Maintainability）：一般包含两个层次，一是当系统出现问题时，快速定位并解决问题的成本，成本低则可维护性好。二是代码是否容易被人理解，是否容易修改和增强功能。

### 21、disabled 和 readonly 的区别？

- disabled 指当 input 元素加载时禁用此元素。input 内容不会随着表单提交。
- readonly 规定输入字段为只读。input 内容会随着表单提交。
- 无论设置 readonly 还是 disabled，通过 js 脚本都能更改 input 的 value

### 22、documen.write 和 innerHTML 的区别？

- document.write 的内容会代替整个文档内容，会重写整个页面。
- innerHTML 的内容只是替代指定元素的内容，只会重写页面中的部分内容。

### 23、innerHTML 与 outerHTML 的区别？

    对于这样一个 HTML 元素：<div>content<br/></div>
    innerHTML：内部 HTML，content<br/>
    outerHTML：外部 HTML，<div>content<br/></div>
    innerText：内部文本，content
    outerText：外部文本，content
