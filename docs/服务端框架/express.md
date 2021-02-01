### express 是什么

- express 是一个简洁而灵活的 node.js Web 应用框架
- 可以设置中间件来响应 HTTP 请求。
- 定义了路由表用于执行不同的 HTTP 请求动作。
- 可以通过向模板传递参数来动态渲染 HTML 页面。

### 创建 app

    const express = require('express')
    const app = express()

### 路由

const router = express.Router()

### request

    req.app：当callback为外部文件时，用req.app访问express的实例
    req.baseUrl：获取路由当前安装的URL路径
    req.body / req.cookies：获得「请求主体」/ Cookies
    req.fresh / req.stale：判断请求是否还「新鲜」
    req.hostname / req.ip：获取主机名和IP地址
    req.originalUrl：获取原始请求URL
    req.params：获取路由的parameters
    req.path：获取请求路径
    req.protocol：获取协议类型
    req.query：获取URL的查询参数串
    req.route：获取当前匹配的路由
    req.subdomains：获取子域名
    req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码

### response

    res.app：同req.app一样
    res.append()：追加指定HTTP头
    res.set()在res.append()后将重置之前设置的头
    res.cookie(name，value [，option])：设置Cookie
    opition: domain / expires / httpOnly / maxAge / path / secure / signed
    res.clearCookie()：清除Cookie
    res.download()：传送指定路径的文件
    res.get()：返回指定的HTTP头
    res.json()：传送JSON响应
    res.jsonp()：传送JSONP响应
    res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
    res.redirect()：设置响应的Location HTTP头，并且设置状态码302
    res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
    res.send()：传送HTTP响应
    res.end() 响应
    res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
    res.set()：设置HTTP头，传入object可以一次设置多个头
    res.status()：设置HTTP状态码 res.status(403)
    res.type()：设置Content-Type的MIME类型

### 设置静态文件夹

    // 静态文件
    app.use("/public", express.static(__dirname + "/public"));
    这样就能随意访问/public下的文件了

### 路由

```js
var express = require("express");
var app = express();

// 路由：字符串类型
app.get("/book", function(req, res, next) {
  res.send("book");
});

// 路由：字符串模式
app.get("/user/*man", function(req, res, next) {
  res.send("user"); // 比如： /user/man, /user/woman
});

// 路由：正则表达式
app.get(/animals?$/, function(req, res, next) {
  res.send("animal"); // 比如： /animal, /animals
});

// 路由：命名参数
app.get("/employee/:uid/:age", function(req, res, next) {
  res.json(req.params); // 比如：/111/30，返回 {"uid": 111, "age": 30}
});

app.listen(3000);
```

### 路由拆分出来

```js
var express = require("express");
var app = express();

var user = express.Router();

user.get("/list", function(req, res, next) {
  res.send("/list");
});

user.get("/detail", function(req, res, next) {
  res.send("/detail");
});

// 当中间件使用 路由前批量会有/user
app.use("/user", user); // mini app，通常做应用拆分

app.listen(3000);
```

### 运行顺序

```js
// 都会执行 传递数组函数
var cb0 = function(req, res, next) {
  console.log("cb0 start");
  next();
  console.log("cb0 end");
};

var cb1 = function(req, res, next) {
  console.log("cb1 start");
  next();
  console.log("cb1 end");
};

var cb2 = function(req, res) {
  res.send("cb2");
};

// 执行的顺序是 cb0start cb1start cb1end cb0end
app.get("/index", [cb0, cb1, cb2]);
```

### 获取参数

1. query 通过 req.query 获取
2. params 通过 req.params 获取
3. 请求 body 里面的参数需要安装 body-parser 中间件 通过 req.body 获取

### 中间件

express 通过 use 来调用中间件 app.use(中间件函数)

常用的中间件 body-parser 获取请求体中的参数 app.use(bodyParser.json())或者 bodyParser.urlencoded({ extended: false })

### 异步

express 是洋葱模型 支持 async await 异步

```js
// 模拟sleep
const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

app.get("/sleep", async (req, res) => {
  console.time("time");
  await sleep(2000);
  console.timeEnd("time");
  res.end("hello");
});
```
