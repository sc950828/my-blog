### 1、node.js是什么
- node是一个基于chrome v8引擎的javascript运行环境
- node使用了一个事件驱动，非阻塞式I/O的模型，使其轻量又高效
- node是使用c++写的

### 2、v8引擎
- javascript引擎起到的作用是让电脑识别javascript代码。
- v8引擎是使用c++写的

### 3、全局变量
    global
      在node中全局变量不在是window而是global
    __dirname
      当前文件所在路径，不包括当前文件名。与path.dirname(__filename)值相同
    __filename
      当前文件所在路径，包括当前文件名
    exports
      这是一个对于 module.exports 的更简短的引用形式。
    process
      它提供有关当前 Node.js 进程的信息并对其进行控制。
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
    Buffer
      缓冲

### 4、模块的使用
- module.exports/exports导出模块。exports使用的时候不能exports=xxx，应该是exports.xxx = xxx
- require引入模块,支持解构赋值。

### 5、事件 events
    大多数node.js核心api都是采用异步事件驱动架构(fs http)
    所有能触发事件的对象都是EventEmitter类的实例
    事件流程 
      引入模块(events)->
      创建EventEmitter实例(class MyEventEmitter extends events; const myEmitter = new MyEventEmitter())->
      注册事件(myEmitter.on())->
      触发事件(myEmitter.emit())
    如果需要注册一次性事件只需把on替换成once。使用myEventEmitter.once()注册事件,这样不管你emit()几次，始终只执行一次
    事件默认同步执行，如果需要异步则需要使用setImmediate(() => {xxx})将需要执行的放入函数体中。

### 6、文件系统fs
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

### 8、缓冲buffer 流stream
    创建可读流 const myReadStream = fs.createReadStream(path, 编码格式)
    创建可写流 const myWriteStream = fs.createWriteStream(path)
    第一种写入方式
      myReadStream.on("data", function(chunk){myWriteStream.write(chunk)})
    第二种写入方式
      myReadStream.pipe(myWriteStream)

### 9、path
    path.basename(path[, ext])) 返回路径的最后文件名
    path.dirname(path) 返回文件的目录名，不包括最后的文件名
    path.extname(path) 返回路径的后缀
    path.join('xx', 'xx', 'xx') 使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。 最后生成/xx/xx/xx
    path.relative(from, to) 方法根据当前工作目录返回 from 到 to 的相对路径
    path.resolve(xx, xx, xx) 从右往左处理直到是一个绝对路径，否则加上当前路径
