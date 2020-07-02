### 1、什么是 FLy.js

一个支持所有 JavaScript 运行环境的基于 Promise 的、支持请求转发、强大的 http 请求库。可以让您在多个端上尽可能大限度的实现代码复用。

目前 Fly.js 支持的平台包括：Node.js 、微信小程序 、Weex 、React Native 、Quick App 和浏览器，这些平台的 JavaScript 运行时都是不同的。

在浏览器环境下，一个库的大小是非常重要的。这方面 Fly 做的很好，它在保持强大的功能的同时，将自己的身材控制到了最好。min 只有 4.6K 左右，GZIP 压缩后不到 2K，体积是 axios 的四分之一。

### 2、特点

- 提供统一的 Promise API。
- 浏览器环境下，轻量且非常轻量 。
- 支持多种 JavaScript 运行环境
- 支持请求／响应拦截器。
- 自动转换 JSON 数据。
- 支持切换底层 Http Engine，可轻松适配各种运行环境。
- 浏览器端支持全局 Ajax 拦截 。
- H5 页面内嵌到原生 APP 中时，支持将 http 请求转发到 Native。支持直接请求图片。

### 3、使用

安装

```js
// 使用npm
npm install flyio

// 或者使用cdn
<script src="https://unpkg.com/flyio/dist/fly.min.js"></script>
```

引入使用

浏览器、Node、React Native 中引入

```js
//引入fly实例
var fly = require("flyio");

// 或者创建自己的实例
// 浏览器和React Native
var Fly = require("flyio/dist/npm/fly");
// Node 入口
var Fly = require("flyio/src/node");
var fly = new Fly();
```

在微信小程序中引入

```js
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();
```

Weex 中引入

```js
var Fly = require("flyio/dist/npm/weex");
var fly = new Fly();
```

### 4、发送请求

```js
// 发送get请求
var fly = require("flyio");
//通过用户id获取信息,参数直接写在url中
fly
  .get("/user?id=133")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

//query参数通过对象传递
fly
  .get("/user", {
    id: 133,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 发送post请求
fly.post('/user', {
    name: 'Doris',
    age: 24
    phone:"18513222525"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 并发多个请求
function getUserRecords() {
  return fly.get('/user/133/records');
}

function getUserProjects() {
  return fly.get('/user/133/projects');
}

fly.all([getUserRecords(), getUserProjects()])
  .then(fly.spread(function (records, projects) {
    //两个请求都完成
  }))
  .catch(function(error){
    console.log(error)
  })

//直接调用request函数发起post请求
fly.request("/test",{hh:5},{
    method:"post",
    timeout:5000 //超时设置为5s
 })
.then(d=>{ console.log("request result:",d)})
.catch((e) => console.log("error", e))
```

### 5、拦截器

```js
//添加请求拦截器
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  request.headers["X-Tag"] = "flyio";
  //打印出请求体
  console.log(request.body);
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
});

// 请求拦截器里面的request对象
{
  baseURL, //请求的基地址
  body, //请求的参数
  headers, //自定义的请求头
  method, // 请求方法
  timeout, //本次请求的超时时间
  url, // 本次请求的地址
  withCredentials; //跨域请求是否发送第三方cookie
},

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data;
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
);

// 响应拦截器里面的response对象
{
  data, //服务器返回的数据
  engine, //请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
  headers, //响应头信息
  request  //本次响应对应的请求信息
}

// 移除拦截器
fly.interceptors.request.use(null)
fly.interceptors.response.use(null,null)
```

### 6、错误处理

```js
{
  message:"Not Find 404", //错误消息
  status:404, //如果服务器可通，则为http请求状态码。网络异常时为0，网络超时为1 2为文件下载成功，但保存失败，此错误只出现node环境下 >=200的话就是http请求状态码
  request:{...}, //对应的请求信息
  response:{}, //响应信息
  engine:{}//请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
}
```
