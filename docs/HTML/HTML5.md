### 1、HTML 和 HTML5 有何区别？

- 文档申明不同，HTML5 不基于 SGML，HTML5 使用<!DOCTYPE html>申明文档，更简洁明了。
- HTML 基于 SGML ，所以需要对 DTD 进行引用。
- HTML5 新增了语义化标签，语义更明确。
- HTML 没有绘图功能，HTML5 新增 canvas 画布功能，能绘制图像。

### 2、HTML5 新元素有哪些？

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

### 3、 HTML5 移除的元素有哪些？

    <big> 大字体
    <center> 居中
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

### 3、HTML5 新 input 类型有哪些？

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

### 4、HTML5 新属性有哪些？

    <form>新属性：
      autocomplete 默认on，自动填写表单数据,关闭设置值为off。
      novalidate 表单不验证。
    <input>新属性：
      autocomplete默认on，自动填写表单数据,关闭设置值为off。
      autofocus 是一个 boolean属性。规定在页面加载时，能自动地获得焦点。
      form指明属于哪个form表单，可以不写在form里面。
      formaction覆盖form的action属性，常与submit按钮一起使用。
      formenctype覆盖form的enctype属性，常与submit按钮一起使用。
      formmethod覆盖form的method属性，常与submit按钮一起使用。
      formnovalidate覆盖form的novalidate属性，常与submit按钮一起使用。
      formtarget覆盖form的target属性，常与submit按钮一起使用。
      height 与 width 用于 image类型的 <input /> 标签，设置图像高度和宽度。
      list 用于input与datalist的配合标签。
      min 与 max 用于input类型为number或者range。
      multiple用于input类型为file，可以上传多个文件。
      pattern (regexp) 一个正则表达式用于验证<input /> 元素的值。
      placeholder 提示语。
      required 不能为空。
      step用于input类型为number，每次增加/减少多少。
    全局新属性
      hidden（直接放上去就是隐藏相当于display:none）。(全局属性)
      spellcheck="true"（语法纠错，主要用在文本输入框里面）。(全局属性)
      tabindex="1"（Tab跳转顺序，按Tab键优先级从小到大，越小越高，也是应用在文本输入框）。
      data-自定义属性名字。这样就是自定义属性。(全局属性)
      contenteditable="true"(可编辑状态，单击内容，可修改，p标签 table等等都能用)。
      为style标签添加了scoped属性。
      为script标签添加了defer async的异步属性。
      为html标签添加了manifest属性 定义离线缓存。
    </form>

### 5、拖放

- 拖放是 html5 提供一个新的特性，这个特性增加了拖拽事件的 api,和定义可以拖拽的属性。
- 使用:
  - 定义元素可以拖动，draggable="true"
  - 设置被拖动元素的 ondragstart 事件，在事件里把 id 设置到 dataTransfer 属性里。e.dataTransfer.setData(key, e.target.id)
  - 设置需要接收拖动元素的 ondragover 事件。在该事件里面阻止默认事件即可。e.preventDefault()。
  - 设置需要接收拖动元素的 ondrop 事件，在该事件里面使用 e.dataTransfer.getData(key)获取 id，然后使用 appendChild(id)方法添加 dom。

```js
// <div id="div1" ondragover="dragOver(event)" ondrop="drop(event)">
//   <img
//     id="img1"
//     src="../images/avatar.jpg"
//     alt=""
//     width="100"
//     height="100"
//     draggable="true"
//     ondragstart="dragStart(event)"
//   />
// </div>
// <div id="div2" ondragover="dragOver(event)" ondrop="drop(event)"></div>

// draggable="true"设置元素可以被拖动。
// 被拖动元素设置，ondragstart事件，开始被拖动发生什么。把元素id存到transfer里面
function dragStart(e) {
  e.dataTransfer.setData("MyImg", e.target.id);
}
// 接收拖动元素设置 ondragover事件，在里面阻止默认事件。
function dragOver(e) {
  e.preventDefault();
}
// 接收滚动元素设置 ondrop，停止拖动。阻止默认事件，获取拖动元素id。添加子元素。
function drop(e) {
  e.preventDefault();
  var id = e.dataTransfer.getData("MyImg");
  e.target.appendChild(document.getElementById(id));
}
```

### 6、地理定位

通过 navigator.geolocation.getCurrentPosition(showPosition, showError)获取地理信息，传两个函数作为参数。

### 7、离线缓存

- manifest 文件需要配置正确的 MIME-type，即 "text/cache-manifest"。必须在 web 服务器上进行配置。
- manifest 文件可分为三个部分：
  - CACHE - 在此标题下列出的文件将在首次下载后进行缓存。优先级高于 NETWORK。
  - NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
  - FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）
- 在需要缓存的页面的 html 标签里调用 例如`<html manifest="demo.manifest">`
- 如何更新缓存：
  - （1）更新 manifest 文件
  - （2）通过 javascript 操作
  - （3）清除浏览器缓存
- 注意事项
  - 引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。
  - FALLBACK 中的资源必须和 manifest 文件同源。
  - 站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。

### 8、web 存储

- localStorage 只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份 localStorage 数据。
- sessionStorage 比 localStorage 更严苛一点，除了协议、主机名、端口外，还要求在同一窗口。
- localStorage 会永久存在除非手动清除。
- sessionStorage 在关闭页面或浏览器的时候就会清除。
- localStorage 和 sessionStorage key 必须是字符串类型。**存储的数据都是字符串类型的数据，取出来的数据也是字符串类型，因此如果存储的对象不是字符串，则要转换成字符串数据类型。**
- 检测是否支持 web 存储，typeof(Storage) !== "undefined"
- 常用方法：
  - localStorage/sessionStorage.setItem('key', 'val') // 存储数据
  - localStorage/sessionStorage.getItem('key') // 取数据
  - localStorage/sessionStorage.removeItem('key') // 删除数据
  - localStorage/sessionStorage.clear() // 删除所有数据
  - localstorage/sessionStorage.key(index) //获取某个索引位置的 key，index 从下标 0 开始。

### 9、WebWorker

- web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能
- webworker 线程与 js 主线程最大的区别就在于 webworker 线程无法操作 window 与 document 对象
- 检测浏览器是否支持 Web Worker。 typeof(Worker)!=="undefined"
- 使用:
  - 创建 web worker 文件，worker 文件是一个单独的 js 文件，写好逻辑后，通过 postMessage()方法吧数据发送出去
  - 调用页面创建 worker 对象，var w = new Worker("worker 文件路径").然后通过实例对象调用 onmessage 事件进行监听，并获取 worker 文件里返回的数据
  - 终止 web worker，当我们的 web worker 创建后会持续的监听它，需要中止的时候则使用实例上的方法 w.terminate()。

```js
let w;
function startWorker() {
  // 判断是否支持webWorker
  if (typeof Worker != "undefined") {
    // 创建worker对象
    w = new Worker("WebWorker.js");
    // 通过onmessage监听worker.js发来的数据
    w.onmessage = function (event) {
      document.getElementById("countText").innerText = event.data;
    };
  } else {
    document.getElementById("countText").innerText = "不支持webworker";
  }
}
function stopWorker() {
  // 关闭worker
  w.terminate();
}
```

### 10、SSE

HTML5 服务器发送事件（server-sent event）允许网页获得来自服务器的更新。 Server-Sent 事件 - 单向消息传递 Server-Sent 事件指的是网页自动获取来自服务器的更新。

SSE 是单向通道，只能服务器向客户端发送消息，如果客户端需要向服务器发送消息，则需要一个新的 HTTP 请求。

```js
// 服务器端把 "Content-Type" 报头设置为 "text/event-stream"。现在，您可以开始发送事件流了
// 客户端
if (typeof EventSource !== "undefined") {
  var source = new EventSource("demo_sse.php");
  source.onmessage = function (event) {
    document.getElementById("result").innerHTML += event.data + "<br>";
  };
} else {
  document.getElementById("result").innerHTML =
    "抱歉，你的浏览器不支持 server-sent 事件...";
}
// 三个方法 onopen当通往服务器的连接被打开、onmessage当接收到消息、onerror当发生错误
```

### 11、WebSocket

- WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
- 在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
- Websocket 使用 ws 或 wss 的统一资源标志符，类似于 HTTPS，其中 wss 表示在 TLS 之上的 Websocket。端口 80 或者 443。
- 常用 api:
  - Socket.send() 发送数据 发送的数据必须是纯文本（ArrayBuffer，Blob 等）
  - Socket.close() 关闭连接
  - Socket.onopen 连接建立时触发 用 send 发送数据。
  - Socket.onmessage 客户端接收服务端数据时触发。
  - Socket.onerror 通信发生错误时触发。
  - Socket.onclose 连接关闭时触发。
- 10 个属性
  - binaryType 返回 websocket 连接所传输二进制数据的类型（blob, arraybuffer）
  - bufferedAmount 只读 返回已经被 send()方法放入队列中但还没有被发送到网络中的数据的字节数。一旦队列中的所有数据被发送至网络，则该属性值将被重置为 0。但是，若在发送过程中连接被关闭，则属性值不会重置为 0。
  - extensions 只读 返回服务器选择的扩展名。这当前只是空字符串或连接协商的扩展列表
  - onclose 用于指定连接失败后的回调函数
  - onmessage 用于指定当从服务器接受到信息时的回调函数
  - onopen 用于指定连接成功后的回调函数
  - protocol 只读 服务器选择的下属协议
  - readyState 只读 当前的链接状态，共 4 个
    - 0 建立连接
    - 1 已经连接
    - 2 正在关闭
    - 3 连接已经关闭或者没有连接成功
  - url 只读 WebSocket 的绝对路径

```js
let ws;
let div1 = document.getElementById("div1");
function startWebSocket() {
  // 打开一个 web socket 这个链接是网上的测试链接，目前可用。ws是http链接 wss是https的链接
  ws = new WebSocket("ws://121.40.165.18:8800");
  // 建立连接时调用
  ws.onopen = function () {
    // Web Socket 已连接上，使用 send() 方法发送数据
    ws.send("测试WebSocket，发送数据给服务端");
    alert("数据发送中...");
  };
  // 客户端接收服务端数据时触发
  ws.onmessage = function (evt) {
    var received_msg = evt.data;
    console.log(received_msg);
    div1.innerHTML += received_msg;
    alert("数据已接收...");
  };
  // 关闭时调用
  ws.onclose = function () {
    alert("连接已关闭");
  };
  // 发生错误是调用
  ws.onerror = function (err) {
    alert("发生错误啦", err);
  };
}
// 关闭连接
function stopWebSocket() {
  // 使用close方法关闭连接。
  ws.close();
}
// 再次发送数据
function reSendData() {
  ws.send("再次发送数据");
}
```

### 12、什么是 SVG？其他图像格式相比优势有哪些？

- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- 优势:
  - SVG 是可伸缩的，SVG 可在图像质量不下降的情况下被放大。
  - SVG 图像可通过文本编辑器来创建和修改。

### 13、什么是 canvas?

用于图形的绘制的容器，您必须使用 javascript 来绘制图形。

### 14、canvas 和 svg 区别是什么？

- SVG 是一种使用 XML 描述 2D 图形的语言，不依赖分辨率，不适合游戏。
- Canvas 通过 JavaScript 来绘制 2D 图形，依赖分辨率， 适合游戏。
- SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
- 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
- Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。是一个整体。

### 15、语义化标签的好处？

- 利于 SEO，方便搜索引擎识别页面结构。
- 让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
- 有利于开发者的维护和理解。

### 16、如何处理 HTML5 新标签的浏览器兼容问题？

通过 document.createElement 方法创建 html5 的标签。

### 17、浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？

- 在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

- 离线的情况下，浏览器就直接使用离线存储的资源。

### 18、请描述一下 cookies，sessionStorage 和 localStorage 的区别？

- cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会在浏览器和服务器间来回传递。
- 存储大小：
  - cookie 数据大小不能超过 4 k 。
  - sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
- 有期时间：
  - localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
  - sessionStorage 数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
  - cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。
- 作用域：
  - sessionStorage 只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。
  - localStorage 在所有同源窗口中都是共享的。
  - cookie 在所有同源窗口中都是共享的。
- 获取方式
  - sessionStorage localStorage 通过 getItem()方法获取
  - cookie ajax 请求可以用 getResponseHeader 获取，如果不是 ajax，js 无法获取响应头，只能用 document.cookie 获取设置的 cookie，并且无法获取到服务器端设置了 httponly 的 cookie。
