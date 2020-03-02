1、jqueryAjax
  优点
    对原生XHR的封装，做了兼容处理，简化了使用。
  缺点
    如果有多个请求，并且有依赖关系的话，容易形成回调地狱。
    如果只是使用jquery的ajax请求的话引入整个框架非常的不合理。

2、load() 
  注意 发送的是post请求
  load()方法从服务器加载数据，并把返回的数据放置到指定的元素中。
  $(selector).load(url,data,function(response,status,xhr)) data和function是可选的
    data传递到服务端的数据，该参数会放到body中传递
    response 返回的结果
    status 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
    xhr 包含 XMLHttpRequest 对象

3、get()
  $.get(url,data,function(response,status,xhr),dataType) data和function和dataType是可选的
    data传递到服务端的数据, 改参数会被拼接到url中
    response 返回的结果
    status 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
    xhr 包含 XMLHttpRequest 对象
    dataType 规定预期的服务器响应的数据类型
      "xml" - 一个 XML 文档
      "html" - HTML 作为纯文本
      "text" - 纯文本字符串
      "script" - 以 JavaScript 运行响应，并以纯文本返回
      "json" - 以 JSON 运行响应，并以 JavaScript 对象返回
      "jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调

4、post()
  $.post(url,data,function(response,status,xhr),dataType)
    data传递到服务端的数据, 该参数会放到body中传递
    response 返回的结果
    status 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
    xhr 包含 XMLHttpRequest 对象
    dataType 规定预期的服务器响应的数据类型
      "xml" - 一个 XML 文档
      "html" - HTML 作为纯文本
      "text" - 纯文本字符串
      "script" - 以 JavaScript 运行响应，并以纯文本返回
      "json" - 以 JSON 运行响应，并以 JavaScript 对象返回
      "jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调
