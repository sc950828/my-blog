### 1、什么是错误优先的回调函数？

错误优先的回调函数用于传递错误和数据。第一个参数始终应该是一个错误对象， 用于检查程序是否发生了错误。其余的参数用于传递数据。

```js
fs.readFile(filePath, function (err, data) {
  if (err) {
    //handle the error
  }
  // use the data object
});
```

### 2、node 里的模块是什么

Node 中，每个文件模块都是一个对象,所有的模块都是 Module 的实例。

```js
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

module.exports = Module;

var module = new Module(filename, parent);
```

### 3、require 的模块加载机制

```js
// require 其实内部调用 Module._load 方法
Module._load = function(request, parent, isMain) {
  //  计算绝对路径
  var filename = Module._resolveFilename(request, parent);

  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;

  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }

  /********************************这里注意了**************************/
  // 第三步：生成模块实例，存入缓存
  // 这里的Module就是我们上面的1.1定义的Module
  var module = new Module(filename, parent);
  Module._cache[filename] = module;

  /********************************这里注意了**************************/
  // 第四步：加载模块
  // 下面的module.load实际上是Module原型上有一个方法叫Module.prototype.load
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports;
};
```

### 4、Node 事件循环的流程

在进程启动时，Node 便会创建一个类似于 while(true)的循环，每执行一次循环体的过程我们成为 Tick。

每个 Tick 的过程就是查看是否有事件待处理。如果有就取出事件及其相关的回调函数。然后进入下一个循环，如果不再有事件处理，就退出进程。

### 5、如何查看 V8 的内存使用情况

```js
// 使用process.memoryUsage()
{
  rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472,
  external: 49879
}
```

### 6、v8 引擎的垃圾回收

- v8 引擎将内存分为了新生代和老生代。

- 新创建的对象或者只经历过一次的垃圾回收的对象被称为新生代。经历过多次垃圾回收的对象被称为老生代。

- 新生代将内存一分为二，分为 From 和 To 两个空间，处于使用状态的 semispace 称为 From 空间，处于闲置状态的 semispace 称为 To 空间。当 From 空间满了的时候会执行 Scavenge 算法进行垃圾回收。当我们执行垃圾回收算法的时候应用逻辑将会停止，等垃圾回收结束后再继续执行。这个算法分为三步：

  - （1）首先检查 From 空间的存活对象，如果对象存活则判断对象是否满足晋升到老生代的条件，如果满足条件则晋升到老生代。如果不满足条件则移动 To 空间。
  - （2）如果对象不存活，则释放对象的空间。
  - （3）最后将 From 空间和 To 空间角色进行交换。

- 新生代对象晋升到老生代有两个条件：

  - （1）第一个是判断是对象否已经经过一次 Scavenge 回收。若经历过，则将对象从 From 空间复制到老生代中；若没有经历，则复制到 To 空间。

  - （2）第二个是 To 空间的内存使用占比是否超过限制。当对象从 From 空间复制到 To 空间时，若 To 空间使用超过 25%，则对象直接晋升到老生代中。设置 25% 的原因主要是因为算法结束后，两个空间结束后会交换位置，如果 To 空间的内存太小，会影响后续的内存分配。

- 在老生代中，存活对象占较大比重，如果继续采用 Scavenge 算法进行管理，就会存在两个问题：

  - 由于存活对象较多，复制存活对象的效率会很低。采用 Scavenge 算法会浪费一半内存，由于老生代所占堆内存远大于新生代，所以浪费会很严重。所以，V8 在老生代中主要采用了 Mark-Sweep(标记清除) 和 Mark-Compact(标记整理) 相结合的方式进行垃圾回收。

- 老生代采用了标记清除法和标记整理相结合的方法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记整理。标记整理会将存活对象向一侧移动，随后清空边界的另一侧内存，这样空闲的内存都是连续的，但是带来的问题就是速度会慢一些。在 V8 中，老生代是 Mark-Sweep 和 Mark-Compact 两者共同进行管理的。

- 由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。 为了解决这个问题 V8 引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完一小步就让运行逻辑执行一会，就这样交替运行。

### 7、Buffer 会占用 V8 分配的内存吗

不会，Buffer 属于堆外内存，不是 V8 分配的。

### 8、Buffer.alloc 和 Buffer.allocUnsafe 的区别

Buffer.allocUnsafe 创建的 Buffer 实例的底层内存是未初始化的。 新创建的 Buffer 的内容是未知的，可能包含敏感数据。 使用 Buffer.alloc() 可以创建以零初始化的 Buffer 实例。

### 9、Buffer 的内存分配机制

为了高效的使用申请来的内存，Node 采用了 slab 分配机制。slab 是一种动态的内存管理机制。 Node 以 8kb 为界限来区分 Buffer 为大对象还是小对象，如果是小于 8kb 就是小 Buffer，大于 8kb 就是大 Buffer。

例如第一次分配一个 1024 字节的 Buffer，Buffer.alloc(1024),那么这次分配就会用到一个 slab，接着如果继续 Buffer.alloc(1024),那么上一次用的 slab 的空间还没有用完，因为总共是 8kb，1024+1024 = 2048 个字节，没有 8kb，所以就继续用这个 slab 给 Buffer 分配空间。

如果超过 8kb，那么直接用 C++底层地宫的 SlowBuffer 来给 Buffer 对象提供空间。

### 10、webSocket 协议

WebSocket 连接必须由浏览器发起

```
请求
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket 表示这个连接将要被转换为WebSocket连接；
Connection: Upgrade 表示这个连接将要被转换为WebSocket连接；
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string 标识这个连接
Sec-WebSocket-Version: 13 指定了WebSocket的协议版本

响应
HTTP/1.1 101 Switching Protocols  响应是101 表示本次连接的HTTP协议被更改为webSocket
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
```

### 11、webSocket 与传统的 http 有什么优势

- 客户端与服务器只需要一个 TCP 连接，比 http 长轮询使用更少的连接
- webSocket 服务端可以推送数据到客户端
- 更轻量的协议头，减少数据传输量

### 12、 身份验证过程中会涉及到密钥， 对称加密，非对称加密，摘要的概念，请解释一下

密钥：密钥是一种参数，它是在明文转换为密文或将密文转换为明文的算法中输入的参数。密钥分为对称密钥与非对称密钥，分别应用在对称加密和非对称加密上。

对称加密：对称加密又叫做私钥加密，即信息的发送方和接收方使用同一个密钥去加密和解密数据。对称加密的特点是算法公开、加密和解密速度快，适合于对大数据量进行加密，常见的对称加密算法有 DES、3DES、TDEA、Blowfish、RC5 和 IDEA。

非对称加密：非对称加密也叫做公钥加密。非对称加密与对称加密相比，其安全性更好。对称加密的通信双方使用相同的密钥，如果一方的密钥遭泄露，那么整个通信就会被破解。而非对称加密使用一对密钥，即公钥和私钥，且二者成对出现。私钥被自己保存，不能对外泄露。公钥指的是公共的密钥，任何人都可以获得该密钥。用公钥或私钥中的任何一个进行加密，用另一个进行解密。

摘要： 摘要算法又称哈希/散列算法。它通过一个函数，把任意长度的数据转换为一个长度固定的数据串（通常用 16 进制的字符串表示）。算法不可逆。

### 13、请简述一下 node 的多进程架构

Node 是个单进程单线程模型，他线程安全。

因此，所谓的 Node 单线程其实只是一个 JavaScript 主线程，那些耗时的异步操作还是线程池完成的，Node 将这些耗时的操作都扔到线程池去处理了，而 Node 自己只需要往返调度，并没有真正的 I/O 操作。

面对 node 单进程对多核 CPU 使用不足的情况，Node 提供了 child_process 模块，来实现进程的复制，node 的多进程架构是主从模式。进程之间采用管道的方式进行通信。

```js
var fork = require("child_process").fork;
var cpus = require("os").cpus();
for (var i = 0; i < cpus.length; i++) {
  fork("./worker.js");
}
```

### 14、node 创建子进程的方法大致有：

- spawn()： 启动一个子进程来执行命令
- exec(): 启动一个子进程来执行命令，与 spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况
- execFlie(): 启动一个子进程来执行可执行文件
- fork(): 与 spawn()类似，不同电在于它创建 Node 子进程需要执行 js 文件
- spawn()与 exec()、execFile()不同的是，后两者创建时可以指定 timeout 属性设置超时时间，一旦创建的进程超过设定的时间就会被杀死
- exec()与 execFile()不同的是，exec()适合执行已有命令，execFile()适合执行文件。
