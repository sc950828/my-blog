## ajax 文档

[菜鸟教程 ajax 文档](https://www.runoob.com/ajax/ajax-tutorial.html)

## ajax 简介

- ajax = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
- ajax 不是新的编程语言，而是一种使用现有标准的新方法。
- ajax 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。
- ajax 不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行。
- ajax 只支持 get post
- 缺点
  - 使用起来比较繁琐 ie 有自己的一套需要兼容

## 创建对象

- 创建 XMLHttpRequest 对象的语法：现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。variable=new XMLHttpRequest();
- 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：variable=new ActiveXObject("Microsoft.XMLHTTP");

```js
const url = "http://jsonplaceholder.typicode.com/users";

let xmlhttp;
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
```

## 实例方法 发送请求

- xmlhttp.open(method,url,async)
  - method：请求的类型；GET 或 POST
  - url：文件在服务器上的位置
  - async：true（异步）或 false（同步）
- xmlhttp.send(string)仅用于 POST 请求，get 方法的 string 值为空

```js
// 发送请求
xmlhttp.open("GET", url, true);
xmlhttp.send();
```

## 响应

- xmlhttp.responseText 获得字符串形式的响应数据。
- xmlhttp.responseXML 获得 XML 形式的响应数据。

```js
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //    console.log(xmlhttp.responseText)
    let obj = JSON.parse(xmlhttp.responseText);
    console.log(obj);
  }
};
```

## 同步和异步

- 如果是异步请求，open 方法的第三个参数是 true，此时我们接收响应需要使用 xmlhttp 对象的 onstatechange 事件方法来监听响应
- 如果是 false 就是同步请求 我们只需要在 send()方法后使用 xmlhttp.responseText 或者 xmlhttp.responseXML 获取响应数据就可以了。

```js
xmlhttp.open("GET", "/try/ajax/ajax_info.txt", false);
xmlhttp.send();

// 异步
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //    console.log(xmlhttp.responseText)
    let obj = JSON.parse(xmlhttp.responseText);
    console.log(obj);
  }
};

// 同步
document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
```

## readyState status

```
readyState
  0: 请求未初始化
  1: 服务器连接已建立
  2: 请求已接收
  3: 请求处理中
  4: 请求已完成，且响应已就绪
status
  200: "OK"
  404: 未找到页面
```

## Ajax 怎么解决浏览器缓存问题？

- （1）在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

- （2）在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

- （3）在 URL 后面加上一个随机数： "fresh=" + Math.random();。

- （4）在 URL 后面加上时间戳："nowtime=" + new Date().getTime();。

- （5）如果是使用 jQuery，直接这样就可以了`$.ajaxSetup({cache:false})`。这样页面的所有 ajax 都会执行这条语句就是不需要保存缓存记录。
