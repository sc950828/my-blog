### 1、node.js 是什么

- node 是一个基于 chrome v8 引擎的 javascript 运行环境
- node 使用了一个事件驱动，非阻塞式 I/O 的模型，使其轻量又高效
- node 是使用 c++写的

- node 基础架构可以大致分为下面三层
  - 上层是 Node 标准库，就是 nodejs 的 api
  - 中层是 Node bindings（由 c++ 实现）
  - 下层是 Node.js 运行时的关键， 里面有 v8 引擎 libuv 等

事件循环、观察者、请求对象、I/O 线程池共同构成了 Node 的事件驱动 异步 I/O 模型。

### 2、v8 引擎

- javascript 引擎起到的作用是让电脑识别 javascript 代码。
- v8 引擎是使用 c++写的

### 3、全局变量

    global
      在node中全局变量不在是window而是global
    __dirname
      当前文件所在路径，不包括当前文件名。与path.dirname(__filename)值相同
    __filename
      当前文件所在路径，包括当前文件名
    process
      它提供有关当前 Node.js 进程的信息并对其进行控制。
      process.nextTick 方法允许你把一个回调放在下一次时间轮询队列的头上可以用来延迟执行。
    URL
      用于处理与解析 URL
    console
      输出 console.log() console.error() console.warn()
    setTimeout() clearTimeout()
      定时器，指定时间输出一次
    setInterval() clearInterval()
      定时器，每隔指定时间输出一次
    require()
      引入模块
    module
      当前模块
    exports
      这是一个对于 module.exports 的更简短的引用形式。
    Buffer
      缓冲

### 4、模块的使用

- module.exports/exports 导出模块。exports 使用的时候不能 exports=xxx，应该是 exports.xxx = xxx
- require 引入模块,支持解构赋值。

### 5、事件 events

    大多数node.js核心api都是采用异步事件驱动架构(fs http)
    所有能触发事件的对象都是EventEmitter类的实例
    事件流程
      引入模块const EventEmitter = require(events).EventEmitter->
      自定义事件类继承EventEmitter class MyEventEmitter extends EventEmitter{};
      创建EventEmitter实例const myEmitter = new MyEventEmitter()->
      注册事件(myEmitter.on())->
      触发事件(myEmitter.emit())
    如果需要注册一次性事件只需把on替换成once。使用myEventEmitter.once()注册事件,这样不管你emit()几次，始终只执行一次
    事件默认同步执行，如果需要异步则需要使用setImmediate(() => {xxx})将需要执行的放入函数体中。

```js
const EventEmitter = require("events").EventEmitter;

const AudioDevice = {
  play: function (track) {
    console.log("play", track);
  },
  stop: function () {
    console.log("stop");
  }
};

class MusicPlayer extends EventEmitter {
  constructor() {
    super();
    this.playing = false;
  }
}

const musicPlayer = new MusicPlayer();
musicPlayer.on("play", function (track) {
  this.playing = true;
  AudioDevice.play(track);
});
musicPlayer.on("stop", function () {
  this.playing = false;
  AudioDevice.stop();
});

musicPlayer.emit("play", "The Roots - The Fire");
setTimeout(function () {
  musicPlayer.emit("stop");
}, 1000);

// 处理异常
// EventEmitter 实例发生错误会发出一个 error 事件
// 如果没有监听器，默认动作是打印一个堆栈并退出程序
musicPlayer.on("error", function (err) {
  console.err("Error:", err);
});
```

### 6、文件系统 fs

    同步读文件 fs.readFileSync(path)
    异步读文件 fs.readFile(path, function(err, data){})
    同步写取文件 fs.writeFileSync(path)
    异步写文件 fs.writeFile(path, data, function(err){})
    同步删除文件 fs.unlinkSync(path)
    异步删除文件 fs.unlink(path, function(err){})
    同步创建文件夹 fs.mkdirSync(path)
    异步创建文件夹 fs.mkdir(path, function(err){})
    同步删除文件夹 fs.rmdirSync(path)
    异步删除文件夹 fs.rmdir(path, function(err){})
    同步判断是不是文件 fs.statSync(path).isFile()
    异步判断是不是文件 fs.stat(path, function (err, data) {data.isFile()})
    同步判断是不是文件夹 fs.statSyc(path).isDirectory()
    异步判断是不是文件夹 fs.stat(path, function (err, data) {data.isDirectory()})
    同步复制文件 fs.copyFileSync(src, dest)
    异步复制文件 fs.copyFile(src, dest, function(err){})
    判断文件是否存在，以及权限 fs.access(path, 权限, function(err){})

### 7、http

    //引入http模块
    const http = require('http')
    //创建服务器
    const server = http.createServer((req, res) => {
      console.log(req.url)
      res.writeHead(200, {'Content-type': 'text/plain'})
      res.write("hello world!")
      res.end()
    })
    //服务器监听端口ip
    server.listen(7000, "127.0.0.1")

### 8、缓冲 buffer 流 stream

    创建可读流 const myReadStream = fs.createReadStream(path, 编码格式)
    创建可写流 const myWriteStream = fs.createWriteStream(path)
    第一种写入方式
      myReadStream.on("data", function(chunk){myWriteStream.write(chunk)})
    第二种写入方式
      myReadStream.pipe(myWriteStream)

### 9、path

    path.basename(path[, ext]) 返回路径的最后文件名
    path.dirname(path) 返回文件的目录名，不包括最后的文件名
    path.extname(path) 返回路径的后缀
    path.join('xx', 'xx', 'xx') 使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。 最后生成/xx/xx/xx
    path.relative(from, to) 方法根据当前工作目录返回 from 到 to 的相对路径
    path.resolve(xx, xx, xx) 从右往左处理直到是一个绝对路径，否则加上当前路径

### 10、 Libuv

Libuv 是一个高性能的，事件驱动的异步 I/O 库，它本身是由 C 语言编写的，具有很高的可移植性。libuv 封装了不同平台底层对于异步 IO 模型的实现，libuv 的 API 包含有时间，非阻塞的网络，异步文件操作，子进程等等，所以它还本身具备着 Windows, Linux 都可使用的跨平台能力。

在 Node.js 中经典的代码调用方式：都是从 JavaScript 调用 Node 核心模块，核心模块调用 C++ 内建模块，内建模块通过 libuv 进行系统调用。
