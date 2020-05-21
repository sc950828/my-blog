### 1、koa

koa 是一个新的 web 框架，由 express 幕后的原班人马打造。核心是中间件 Middleware 和上下文 context。

### 2、koa 特点

路由方法里面的参数是 context 对象，里面包含 request 和 response

Context 中有两部分，一部分是自身属性，主要是应用于框架内部使用，一部分是 Request 和 Response 委托的操作方法，主要为提供给用户更方便从 Request 获取想要的参数和更方便的设置 Response 内容。

### 3、创建 app

    const koa = require("koa")
    const app = new koa()

    app.listen(1995); //在这里创建server

### 4、路由

    const KoaRouter = require('koa-router')
    const router = new KoaRouter()
    app.use(router.routes()).use(router.allowedMethods()) //启用路由
    路由文件使用module.exports = router.routes()导出模块

### 5、context 对象

koa 中每一个请求都将创建一个 Context 对象，context 对象里面是 response request 等

### 6、request

    request.header 查看请求头对象
    request.header= 设置请求头
    request.headers 查看请求头对象。别名为 request.header
    request.headers= 设置请求头对象。别名为 request.header=
    request.method 查看请求方法。
    request.method= 设置请求方法，对于实现诸如 methodOverride() 的中间件是有用的。
    request.length 返回以数字返回请求的 Content-Length，或 undefined。
    request.url 获取请求 URL
    request.url= 设置请求 URL, 对 url 重写有用
    request.originalUrl 获取请求原始URL。
    request.origin 获取URL的来源，包括 protocol 和 host。
    request.href 获取完整的请求URL，包括 protocol，host 和 url。
    request.path 获取请求路径名。
    request.path= 设置请求路径名，并在存在时保留查询字符串。
    request.querystring 根据 ? 获取原始查询字符串.
    request.querystring= 设置原始查询字符串。
    request.search 使用 ? 获取原始查询字符串。
    request.search= 设置原始查询字符串。
    request.host 获取当前主机（hostname:port）。当 app.proxy 是 true 时支持 X-Forwarded-Host，否则使用 Host。
    request.hostname 存在时获取主机名。当 app.proxy 是 true 时支持 X-Forwarded-Host，否则使用 Host。
    request.type 获取请求 Content-Type 不含参数 "charset"。
    request.charset 在存在时获取请求字符集，或者 undefined
    request.query 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象。不支持嵌套对象
    request.query= 将查询字符串设置为给定对象。不支持嵌套对象
    ...等等

### 7、response

    response.header 响应标头对象。
    response.headers 响应标头对象。别名是 response.header。
    response.status 获取响应状态。默认情况下，response.status 设置为 404 而不是像 node 的 res.statusCode 那样默认为 200。
    response.body 获取响应主体。
    response.body= 将响应体设置为以下之一：
      string 写入
      Buffer 写入
      Stream 管道
      Object || Array JSON-字符串化
      null 无内容响应
    如果 response.status 未被设置, Koa 将会自动设置状态为 200 或 204。
    response.get(field) 不区分大小写获取响应标头字段值 field。
    response.set(field, value) 设置响应标头 field 到 value:
    response.append(field, value) 用值 val 附加额外的标头 field。
    response.set(fields) 用一个对象设置多个响应标头fields
    response.remove(field) 删除标头 field。
    response.type 获取响应 Content-Type 不含参数 "charset"。
    response.type= 设置响应 Content-Type 通过 mime 字符串或文件扩展名。
    response.redirect(url, [alt])重定向
    ...等等

### 8、request 别名 不想 ctx.request.xxx,我们提供了别名。ctx 就代表 ctx.request

    ctx.header
    ctx.headers
    ctx.method
    ctx.method=
    ctx.url
    ctx.url=
    ctx.originalUrl
    ctx.origin
    ctx.href
    ctx.path
    ctx.path=
    ctx.query
    ctx.query=
    ctx.querystring
    ctx.querystring=
    ctx.host
    ctx.hostname
    ctx.fresh
    ctx.stale
    ctx.socket
    ctx.protocol
    ctx.secure
    ctx.ip
    ctx.ips
    ctx.subdomains
    ctx.is()
    ctx.accepts()
    ctx.acceptsEncodings()
    ctx.acceptsCharsets()
    ctx.acceptsLanguages()
    ctx.get()

### 9、response 别名 不想 ctx.response.xxx,我们提供了别名。ctx 就代表 ctx.response

    ctx.body
    ctx.body=
    ctx.status
    ctx.status=
    ctx.message
    ctx.message=
    ctx.length=
    ctx.length
    ctx.type=
    ctx.type
    ctx.headerSent
    ctx.redirect()
    ctx.attachment()
    ctx.set()
    ctx.append()
    ctx.remove()
    ctx.lastModified=
    ctx.etag=

### 10、处理静态资源 比如静态目录为 static

    npm i koa-static
    // 静态资源配置
    // app.use(require('koa-static')('static'))

    // or
    // app.use(require('koa-static')('./static'))

    // or
    // app.use(require('koa-static')(__dirname + '/static'))
    使用
    <img src="/image/account.eb695dc.png"/>

### 11、获取参数

    ctx.request.query获取?=xx类query参数
    ctx.params获取路径参数
    安装koa-body并配置使用通过ctx.request.body获取参数 (post请求 put请求)

### 12、洋葱模型

```js
const Koa = require("koa");
const app = new Koa();
app.use((ctx, next) => {
  console.log(1);
  next();
  console.log(3);
});
app.use(ctx => {
  console.log(2);
});
app.listen(3001);
// 执行结果是1=>2=>3
```

### 13、常用中间件

koa-router 处理路由

koa-static 处理静态资源

koa-pramater 参数验证

koa-body 处理请求体参数

koa-json-error 处理 error

koa-jwt token 验证

### 14、koa 和 express 区别

Express 功能丰富，随取随用，并且框架自身封装了大量便利的功能，比如路由、视图处理等等。koa 更轻量，框架自身并没集成太多功能，大部分功能需要用户自行 require 中间件去解决。路由都需要额外的中间件。

回调函数不同 express 是同步的回调函数，包含 req res next 三个参数。koa 是异步函数，包含 context next 两个参数。

express 异步基于回调函数，koa 基于 async await。
