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

### 2、require 的模块加载机制

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

### 3、Node 事件循环的流程

在进程启动时，Node 便会创建一个类似于 while(true)的循环，每执行一次循环体的过程我们成为 Tick。

每个 Tick 的过程就是查看是否有事件待处理。如果有就取出事件及其相关的回调函数。然后进入下一个循环，如果不再有事件处理，就退出进程。

Node.js 的运行机制如下:

- V8 引擎解析 JavaScript 脚本。
- 解析后的代码，调用 Node API。
- libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
- V8 引擎再将结果返回给用户。

node 中事件循环的顺序

- poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
- check 阶段：执行 setImmediate() 的回调
- close callbacks 阶段：执行 socket 的 close 事件回调
- timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare 阶段：仅 node 内部使用

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O 事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）

Node 端事件循环中的异步队列也是这两种：macro（宏任务）队列和 micro（微任务）队列。

- 常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作等。
- 常见的 micro-task 比如: process.nextTick、new Promise().then(回调)等。

```js
console.log("start");
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
Promise.resolve().then(function () {
  console.log("promise3");
});
console.log("end");

// 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,
// 会先去执行微任务（这点跟浏览器端的一样），所以打印出promise3

// 然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，
// 同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，
// timers阶段有几个setTimeout/setInterval都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务

// start
// end
// promise3
// timer1
// timer2
// promise1
// promise2
```

setTimeout 和 setImmediate

这两个函数分别对应 timer 阶段和 check 阶段，但是在普通定义时两者的执行顺序不确定。setTimeout 可能执行在前，也可能执行在后。

```js
setTimeout(function timeout() {
  console.log("timeout");
}, 0);
setImmediate(function immediate() {
  console.log("immediate");
});
```

但当二者在异步 i/o callback 内部调用时，总是先执行 setImmediate，再执行 setTimeout。
setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。

```js
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});
// immediate
// timeout
```

process.nextTick

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
process.nextTick(() => {
  console.log("nextTick");
  process.nextTick(() => {
    console.log("nextTick");
    process.nextTick(() => {
      console.log("nextTick");
      process.nextTick(() => {
        console.log("nextTick");
      });
    });
  });
});
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1
```

Node 与浏览器的 Event Loop 差异

浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
// 浏览器端运行结果：timer1=>promise1=>timer2=>promise2

// 如果是node11版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)
// 就立刻执行微任务队列，这就跟浏览器端运行一致，最后的结果为timer1=>promise1=>timer2=>promise2

// 如果是node10及其之前版本：要看第一个定时器执行完，第二个定时器是否在完成队列中。
// 如果是第二个定时器还未在完成队列中，最后的结果为timer1=>promise1=>timer2=>promise2
// 如果是第二个定时器已经在完成队列中，则最后的结果为timer1=>timer2=>promise1=>promise2
```

### 4、如何查看 V8 的内存使用情况

```js
// 使用process.memoryUsage()
{
  rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472,
  external: 49879
}
```

### 5、v8 引擎的垃圾回收

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

### 6、请简述一下 node 的多进程架构

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

### 7、node 创建子进程的方法大致有：

- spawn()： 启动一个子进程来执行命令
- exec(): 启动一个子进程来执行命令，与 spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况
- execFlie(): 启动一个子进程来执行可执行文件
- fork(): 与 spawn()类似，不同电在于它创建 Node 子进程需要执行 js 文件
- spawn()与 exec()、execFile()不同的是，后两者创建时可以指定 timeout 属性设置超时时间，一旦创建的进程超过设定的时间就会被杀死
- exec()与 execFile()不同的是，exec()适合执行已有命令，execFile()适合执行文件。
