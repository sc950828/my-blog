### 1、ajax
* ajax = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
* ajax 不是新的编程语言，而是一种使用现有标准的新方法。
* ajax 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。
* ajax 不需要任何浏览器插件，但需要用户允许JavaScript在浏览器上执行。
* ajax只支持 get post
* 缺点
  * 使用起来比较繁琐 ie有自己的一套需要兼容

### 2、创建对象
* 创建 XMLHttpRequest 对象的语法：现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建XMLHttpRequest 对象。variable=new XMLHttpRequest();
* 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：variable=new ActiveXObject("Microsoft.XMLHTTP");

### 3、实例方法 发送请求
* xmlhttp.open(method,url,async)
  * method：请求的类型；GET 或 POST
  * url：文件在服务器上的位置
  * async：true（异步）或 false（同步）
* xmlhttp.send(string)仅用于 POST 请求，get方法的string值为空

### 4、响应
* xmlhttp.responseText 获得字符串形式的响应数据。
* xmlhttp.responseXML 获得 XML 形式的响应数据。

### 5、同步和异步
* 如果是异步请求，open方法的第三个参数是true，此时我们接收响应需要使用xmlhttp对象的onstatechange事件方法来监听响应，如果是false同步请求
* 我们只需要在send()方法的使用xmlhttp.responseText或者xmlhttp.responseXML接收响应数据就可以了。
  ```javascript
  方法的使用xmlhttp.onreadystatechange = function () {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      //这里就是成功了
    }
  }
  ```

### 6、readyState status
    readyState
      0: 请求未初始化
      1: 服务器连接已建立
      2: 请求已接收
      3: 请求处理中
      4: 请求已完成，且响应已就绪
    status
      200: "OK"
      404: 未找到页面
