### 1、http 是什么？

- http 是超文本传输协议，http 是基于 tcp/ip 来从服务端传送超文本到客户端浏览器的。属于网络层级中的应用层。
- http 默认端口 80，https 默认端口 443。

### 2、http 的特点是什么？

- 无状态 就是 http 传输是没有记忆能力，第一次传送的数据如果第二次还要传的话，需要重新传。
- 无连接 传送完数据之后就断开了连接。
- 媒体独立 可以传送任何数据类型。

### 3、网络层级

- 物理层 网线
- 数据链路层
- 网络层 ip
- 传输层 tcp udp
- 会话层
- 表示层
- 应用层 http

### 4、http 请求响应步骤

- tcp 的三次握手，建立 tcp 的连接
- 客户端发送请求，请求包括请求行 请求头 空行 请求体
- 服务器发送响应，响应包括响应行 响应头 空行 响应体
- tcp 四次挥手，断开 tcp 连接

### 5、请求行 响应行包括什么？

- 请求行有协议 请求路径 请求方法
- 响应行有协议 状态码

### 6、请求头常见的有什么?

    Accept 可以接受的数据类型
    Accept-Charset 可接受的字符集
    Accept-Language 可接受的响应内容语言列表
    Accept-Encoding 告诉服务器，客户机支持的数据压缩格式。
    Content-Type 请求参数的数据类型
    Authorization HTTP授权的授权证书 一般我们用来存放token Authorization: Bearer QWxhZGRpbjpvcGVuIHNlc2FtZQ==
    Connection 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）
    Host 请求服务器的域名及端口号(服务端)
    Origin: 请求的来源域名和端口号 （跨域请求时，浏览器会自动带上这个头信息）
    Referer: 当前发送请求的域名及端口号及参数，请求资源的完整URI(客户端)https:/localhost:8081/link?query=xxxxx
    Cookie cookie信息
    User-Agent 浏览器的一些信息
    Date 客户机通过这个头告诉服务器，客户机当前请求时间
    Cache-Control 是否使用缓存 max-age no-cache no-store等等
    If-Modify-Since 协商缓存标志 值等于上次响应的last-Modify的值
    If-None-Match 协商缓存标志 值等于上次响应的ETag字符串

### 7、响应头常见的有什么？

    Expires 是否强缓存 (老版本)是个将来的时间戳，有问题后来使用cache-control
    Date 服务端发送资源时的服务器时间
    Cache-Control 是否强缓存 他的max-age值表示在多少时间内有效
    Content-Type 响应的数据类型
    Content-Encoding 告诉浏览器数据压缩的格式
    Access-Control-Allow-Origin 指定哪些域名可以访问服务器
    Access-Control-Allow-Methods 哪些方法
    Access-Control-Allow-Headers 哪些请求头
    Last-Modified 是否协商缓存 是个时间戳 (老版本)有问题后来使用Etag，比如编辑了文件并没有改变东西会有问题
    ETag 是否使用协商缓存 由服务端为每个文件生成唯一的字符
    Set-Cookie: 服务端发送的cookie

### 8、几种常见的 content-type

    application/x-www-form-urlencoded 浏览器的原生form表单 提交的数据按照 key1=val1&key2=val2 的方式进行编码，key和val都进行了URL转码
    multipart/form-data 常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 form 的 enctype 等于这个值。
    application/json 序列化后的 JSON 字符串
    text/xml xml
    text/plain 文本
    text/html html

### 9、tcp/ip

- TCP/IP 是因特网的通信协议。
- tcp 在传输层是传输控制协议
- ip 在网络层

### 10、状态码表示什么含义？列出一些常见的状态码？

    1xx 接收的请求正在处理
    2xx 请求正常处理完毕
    3xx 需要进行附加操作完成请求 比如重定向
    4xx 服务端无法处理请求 客户端错误
    5xx 服务端处理请求出错

    200 成功
    301 永久重定向
    302 临时重定向 会改变请求方法 把post改为get
    307 临时重定向 不会改变请求方式
    400 请求错误 客户端错误
    401 未授权
    403 请求被拒绝
    404 资源缺失找不到
    500 服务端错误
    502 网关错误 收到了请求 但是无法解析
    503 服务暂时无法使用 响应超时

### 11、代理 网关是什么？

- 代理接收请求转发请求 接收响应转发响应
  - 缓存代理 代理转发响应时 缓存代理会将数据缓存到自己的服务器上 下次请求来的时候直接将缓存的数据返回
  - 透明代理 只负责转发请求和响应 不对数据进行操作
- 网关
  - 网关会接收请求转发请求 接收响应转发响应 而且还能提供非 http 协议服务。

### 12、用户认证有哪些方式？

    basic认证(不安全 base64不是加密方式)
      1.客户端发送请求
      2.服务端返回401 并携带www-Authenticate的响应头
      3.客户端填写用户名密码 在请求头Authorization: Basic 用户名密码base64处理 发送给服务端
      4.服务端认证成功返回200 失败返回401
    digest认证
    ssl客户端认证(一般使用证书 表单双重认证 但这种方式成本比较高)
      客户端发送请求
      服务端返回响应 需要客户端证书
      客户端发送证书
      服务端验证通过后 进行https的通信
    基于表单的认证(一般使用cookie来管理session 使用最为广泛)
      客户端发送用户名密码
      服务端返回Set-Cookie响应头 里面有sessionid
      客户端接收到cookie 保存到本地 以后每次请求都携带上Cookie请求头 里面是sessionid 这样就能维持客户端服务端会话了。

### 13、加密方式有哪些？

- 公开密钥加密(非对称加密) 公钥是公开的使用公钥加密 私钥只有自己知道使用私钥解密(SSL)
- 共享密钥加密(对称加密) 加密解密使用同一把密钥 传输密钥不太安全

### 14、正向代理 反向代理是什么？

- 正向代理
  - 由客户端向代理服务器发出请求，并指定目标访问服务器，然后，代理服务器向源服务器转交需求，并将获得的内容返回给客户端客户端知道真正要请求的服务器
- 反向代理
  - 由客户端向代理服务器发出请求，代理服务器判断目标服务器，然后向目标服务器发送请求获取响应，然后把数据发送给客户端
    对客户端来说并不知道真正的服务器是谁，把代理服务器当成服务器

### 15、请求参数的传递，为什么在浏览器中看参数有时候在 Form Data 里有时候在 Request Payload 里有时又是 Query String Parameters

- 这个是由于请求头 Content-type 设置的原因
  - 当没有设置的时候，比如 get 请求 传参就会是 Query String Parameters
  - 当 Content-type 是 application/x-www-form-urlencoded 传参就会是 Form Data。这是普通表单 post 方式提交。
  - 其他情况就会是 Request Payload 比如 Content-type 是 application/json text/plain 等。
