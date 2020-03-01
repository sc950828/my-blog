### 1、HTML和HTML5有何区别？
*  文档申明不同，HTML5使用<!DOCTYPE html>申明文档，更简洁明了。
*  HTML5新增了语义化标签，语义更明确。
*  HTML没有绘图功能，HTML5新增canvas画布功能，能绘制图像。

### 2、HTML5新元素有哪些？
  ```html
  新的绘图标签
    <canvas> 定义图形容器。该标签基于 JavaScript 的绘图 API。
  新多媒体元素
    <audio> 定义音频内容
    <video> 定义视频（video 或者 movie）
    <source> 定义多媒体资源 <video> 和 <audio>
    <embed> 定义嵌入的内容，比如插件。
  新表单元素
    <datalist> 定义选项列表。请与 input 元素配合使用该元素，来定义 input 可能的值。
    <output> 定义不同类型的输出，比如脚本的输出。
  新的语义化标签
    <header></header>  头部区域标签，块级标签
    <footer></footer>  底部区域标签，块级标签
    <nav></nav> 导航区域标签，块级标签
    <section></section> 类似div，块级标签
    <article></article> 文章段落标签，块级标签
    <aside></aside> 侧边栏区域标签，块级标签
    <figcaption> 定义figure的标题
    <figure> 表示一段独立的流内容，一般表示文档主题内容中的一个独立单元(视频，音频，图片)。会有外边距。
    <dialog> 定义对话框，比如提示框。需要加上open属性，默认会居中并加上边框
  新的其它标签
    <time></time> 时间区域标签，内联标签
    <progress> 定义任何类型的任务的进度。
    <mark></mark> 标记记号标签，内联标签
    <summary></summary> 含 details 元素的标题
    <details></details> 用于描述文档或文档某个部分的细节
    <wbr> 规定在文本中的何处适合添加换行符。
  ```

3、 HTML5移除的元素有哪些？
  ```html
  <big> 大字体
  <center> 据中
  <font> 字体
  <basefont>
  <acronym>
  <applet>
  <dir>
  <frame>
  <frameset>
  <noframes>
  <strike>
  <tt>
  ```

### 3、HTML5新input类型有哪些？
  ```html
  <input type="color" />
  <input type="email" />
  <input type="number" />
  <input type="range" />
  <input type="search" />
  <input type="tel" />
  <input type="url" />
  <input type="time" />
  <input type="week" />
  <input type="month" />
  <input type="date" />
  <input type="datetime" />
  <input type="datetime-local" />
  ```

### 4、HTML5新属性有哪些？
  ```html
  <form>新属性：
    autocomplete 默认on，自动填写表单数据,关闭设置值为off。
    novalidate 表单不验证。
  <input>新属性：
    autocomplete 默认on，自动填写表单数据,关闭设置值为off。
    autofocus 是一个 boolean 属性。规定在页面加载时，能自动地获得焦点。
    form 指明属于哪个form表单，可以不写在form里面。
    formaction 覆盖form的action属性，常与submit按钮一起使用。
    formenctype 覆盖form的enctype属性，常与submit按钮一起使用。
    formmethod 覆盖form的method属性，常与submit按钮一起使用。
    formnovalidate 覆盖form的novalidate属性，常与submit按钮一起使用。
    formtarget 覆盖form的target属性，常与submit按钮一起使用。
    height 与 width 用于 image 类型的 <input> 标签的图像高度和宽度。
    list 用于input与datalist的配合标签。
    min 与 max 用于input类型为number或者range
    multiple 用于input类型为file，可以上传多个文件
    pattern (regexp) 一个正则表达式用于验证 <input> 元素的值。
    placeholder 提示语
    required 不能为空
    step 用于input类型为number，每次增加多少
  全局属性
    hidden（直接放上去就是隐藏 相当于HTML 4 的display）。(全局属性)
    spellcheck="true"（语法纠错，主要用在文本输入框里面）。(全局属性)
    tabindex="1"（Tab跳转顺序 按Tab键优先级从小到大，越小越高，也是应用在文本输入框）。
    data-自定义属性名字。这样就是自定义属性。(全局属性)
    contenteditable="true"(可编辑状态，单击内容，可修改，p标签 table等等都能用)。
    为style标签添加了scoped属性
    为script标签添加了defer async的异步属性
    为html标签添加了manifest属性 定义离线缓存
  ```

### 5、拖放
*  拖放是html5提供一个新的特性，这个特性增加了拖拽事件的api,和定义可以拖拽的属性。
*  使用:
    * 定义元素可以拖动，draggable="true"
    * 设置被拖动元素的ondragstart事件，在事件里把id设置到dataTransfer属性里。e.dataTransfer.setData(key, e.target.id)
    * 设置需要接收拖动元素的ondragover事件。在该事件里面阻止默认事件即可。e.preventDefault()。
    * 设置需要接收拖动元素的ondrop事件，在该事件里面使用e.dataTransfer.getData(key)获取id，然后使用appendChild(id)方法添加dom。

### 6、地理定位
  通过navigator.geolocation.getCurrentPosition(showPosition, showError)获取地理信息，传两个函数作为参数。

### 7、离线缓存
*  manifest 文件的建议的文件扩展名是：".appcache"。
*  manifest 文件需要配置正确的 MIME-type，即 "text/cache-manifest"。必须在 web 服务器上进行配置。
*  manifest 文件可分为三个部分：
    * CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
    * NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
    * FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）
*  在需要缓存的页面的html标签里调用 例如`<html manifest="demo.appcache">`

### 8、web存储
*  localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。
*  sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口
*  localStorage会永久存在除非手动清除。
*  sessionStorage在关闭页面或浏览器的时候就会清除。
*  localStorage和sessionStorage key必须是字符串类型。存储的数据都是字符串类型的数据，取出来的数据也是字符串类型，因此如果存储的对象不是字符串，则要转换成字符串数据类型
*  检测是否支持web存储，typeof(Storage) !== "undefined"
*  常用方法：
    * localStorage/sessionStorage.setItem('key', 'val') // 存储数据
    * localStorage/sessionStorage.getItem('key') // 取数据
    * localStorage/sessionStorage.removeItem('key')   // 删除数据
    * localStorage/sessionStorage.clear() // 删除所有数据
    * localstorage/sessionStorage.key(index) //获取某个索引位置的key，index从下标0开始。

### 9、WebWorker
*  web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能
*  检测浏览器是否支持 Web Worker。 typeof(Worker)!=="undefined"
*  使用:
    * 创建 web worker 文件，worker文件是一个单独的js文件，写好逻辑后，通过postMessage()方法吧数据发送出去
    * 调用页面创建worker对象，var w = new Worker("worker文件路径").然后通过实例对象调用onmessage事件进行监听，并获取worker文件里返回的数据
    * 终止web worker，当我们的web worker创建后会持续的监听它，需要中止的时候则使用实例上的方法w.terminate()。

### 10、WebSocket
*  WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
*  在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
*  Websocket 使用 ws 或 wss 的统一资源标志符，类似于 HTTPS，其中 wss 表示在 TLS 之上的 Websocket。端口80或者443。
*  常用api:
    * Socket.send() 发送数据
    * Socket.close() 关闭连接
    * Socket.onopen 连接建立时触发 用send发送数据
    * Socket.onmessage 客户端接收服务端数据时触发
    * Socket.onerror 通信发生错误时触发
    * Socket.onclose 连接关闭时触发

### 11、什么是SVG？其他图像格式相比优势有哪些？
*  SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
*  优势:
    * SVG 是可伸缩的，SVG 可在图像质量不下降的情况下被放大。
    * SVG 图像可通过文本编辑器来创建和修改。

### 12、什么是 canvas?
  用于图形的绘制的容器，您必须使用javascript来绘制图形。

### 13、canvas和svg区别是什么？
*  SVG 是一种使用 XML 描述 2D 图形的语言，不依赖分辨率，不适合游戏。
*  Canvas 通过 JavaScript 来绘制 2D 图形，依赖分辨率， 适合游戏。
*  SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
*  在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
*  Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

