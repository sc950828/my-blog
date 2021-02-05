## http 是什么？

- http 是超文本传输协议，它使用 TCP 作为传 输层协议，保证了数据传输的可靠性。属于网络层级中的应用层。
- http 默认端口 80，https 默认端口 443。

## http 的特点是什么？

1. 无状态 就是 http 传输是没有记忆能力，第一次传送的数据如果第二次还要传的话，需要重新传。
2. 无连接 传送完数据之后就断开了连接。
3. 媒体独立 可以传送任何数据类型。

## 连接模式

HTTP 有两种连接模式，一种是持续连接，一种非持续连接。非持续连接指的是服务器必须为每一个请求的对象建立和维护 一个全新的连接。持续连接下，TCP 连接默认不关闭，可以被多个请求复用。采用持续连接的好处是可以避免每次建立 TCP 连接三次握手时所花费的时间。在 HTTP1.0 以前使用的非持续的连接，但是可以在请求时，加上 Connection: keep-alive 来要求服务器不要关闭 TCP 连接。HTTP1.1 以后默认采用的是持续的连接。目前对于同一个域，大多数浏览器支持同时建立 6 个持久连接。

## 请求行 响应行包括什么？

- 请求行有协议版本 请求路径 请求方法
- 响应行有协议版本 状态码 相应的状态信息(原因)

## 常见的请求头有什么?

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
    Remote Address 服务器ip和端口
    Referrer-Policy（来源协议）用来规定什么情况下显示Referer字段及refer字段内显示多少信息。
    Cookie cookie信息
    User-Agent 浏览器的一些信息
    Date 客户机通过这个头告诉服务器，客户机当前请求时间
    Cache-Control 是否使用缓存 max-age no-cache no-store等等
    If-Modify-Since 协商缓存标志 值等于上次响应的last-Modify的值
    If-None-Match 协商缓存标志 值等于上次响应的ETag字符串

    对 Accept 系列字段了解多少？

    对于 Accept 系列字段的介绍分为四个部分: 数据格式、压缩方式、支持语言和字符集。
    浏览器告知服务器自己对这四个部分想要收到特定类型的数据。

    客户端接收数据想要的数据格式 Accept

    - text： text/html, text/plain, text/css 等
    - image: image/gif, image/jpeg, image/png 等
    - audio/video: audio/mpeg, video/mp4 等
    - application: application/json, application/javascript, application/pdf, application/octet-stream

    客户端接收数据想要的数据压缩格式 Accept-Encoding

    - gzip: 当今最流行的压缩格式
    - deflate: 另外一种著名的压缩格式
    - br: 一种专门为 HTTP 发明的压缩算法

    客户端接收数据想要的语言类型 Accept-Language

    - Accept-Language: zh-CN, zh, en

    客户端就收数据想要的字符集 Accept-Charset

    - Accept-Charset: charset=utf-8

## 常见的响应头有什么？

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

## 常见的通用标头有什么？

    Date
    Cache-Control
    Connection

## 常见的实体标头有什么？

    Content-Length
    Content-Language
    Content-Encoding

## 状态码表示什么含义？列出一些常见的状态码？

    1xx 接收的请求正在处理
    2xx 请求正常处理完毕
    3xx 需要进行附加操作完成请求 比如重定向
    4xx 服务端无法处理请求 客户端错误
    5xx 服务端处理请求出错

- 101 Switching Protocols。在 HTTP 升级为 WebSocket 的时候，如果服务器同意变更，就会发送状态码 101。
- 200 成功 通常在响应体中放有数据。
- 204 No Content 含义与 200 相同，但响应头后没有 body 数据。
- 206 Partial Content 顾名思义，表示部分内容，它的使用场景为 HTTP 分块下载和断电续传，当然也会带上相应的响应头字段 Content-Range。
- 301 永久重定向 比如你的网站从 HTTP 升级到了 HTTPS 了，以前的站点再也不用了，应当返回 301，这个时候浏览器默认会做缓存优化，在第二次访问的时候自动访问重定向的那个地址。而如果只是暂时不可用，那么直接返回 302 即可，和 301 不同的是，浏览器并不会做缓存优化。
- 302 临时重定向 会改变请求方法 把 post 改为 get。
- 307 临时重定向 不会改变请求方式
- 304 Not Modified: 当协商缓存命中时会返回这个状态码。
- 400 请求错误 客户端错误
- 401 未授权
- 403 请求被拒绝
- 404 资源缺失找不到
- 500 服务端错误
- 501 Not Implemented: 表示客户端请求的功能还不支持。
- 502 Bad Gateway: 服务器自身是正常的，但访问的时候出错了，啥错误咱也不知道。
- 503 Service Unavailable: 表示服务器当前很忙，暂时无法响应服务

## 代理和网关

### 代理分为正向代理反向代理

- 正向代理
  - 由客户端向代理服务器发出请求，并指定目标访问服务器，然后，代理服务器向源服务器转交需求，并将获得的内容返回给客户端客户端知道真正要请求的服务器，服务端不知道真实的客户端是谁。
- 反向代理
  - 由客户端向代理服务器发出请求，代理服务器判断目标服务器，然后向目标服务器发送请求获取响应，然后把数据发送给客户端。对客户端来说并不知道真正的服务器是谁，把代理服务器当成服务器。反向代理器一般用来实现负载平衡。

代理接收请求转发请求 接收响应转发响应

- 缓存代理。代理转发响应时 缓存代理会将数据缓存到自己的服务器上 下次请求来的时候直接将缓存的数据返回
- 负载均衡。客户端的请求只会先到达代理服务器，后面到底有多少源服务器，IP 都是多少，客户端是不知道的。因此，这个代理服务器可以拿到这个请求之后，可以通过特定的算法分发给不同的源服务器，让各台源服务器的负载尽量平均。当然，这样的算法有很多，包括随机算法、轮询、一致性 hash、LRU(最近最少使用)等等。
- 保障安全。利用心跳机制监控后台的服务器，一旦发现故障机就将其踢出集群。并且对于上下行的数据进行过滤，对非法 IP 限流，这些都是代理服务器的工作。
- 透明代理 只负责转发请求和响应 不对数据进行操作
- 代理相关头部字段
  - Via 假如有一个客户端 -> 代理 1 -> 代理 2 -> 源服务器的请求。在源服务器收到请求后，会在请求头拿到这个字段:Via: proxy_server1, proxy_server2。而源服务器响应时，最终在客户端会拿到这样的响应头:Via: proxy_server2, proxy_server1
  - X-Forwarded-For 字面意思就是为谁转发, 它记录的是请求方的 IP 地址(注意，和 Via 区分开，X-Forwarded-For 记录的是请求方这一个 IP，这意味着每经过一个不同的代理，这个字段的名字都要变，从客户端到代理 1，这个字段是客户端的 IP，从代理 1 到代理 2，这个字段就变为了代理 1 的 IP。意味着代理必须解析 HTTP 请求头，然后修改，比直接转发数据性能下降。)。
  - X-Real-IP 是一种获取用户真实 IP 的字段，不管中间经过多少代理，这个字段始终记录最初的客户端的 IP。
    相应的，还有 X-Forwarded-Host 和 X-Forwarded-Proto，分别记录客户端(注意哦，不包括代理)的域名和协议名。

### 网关

网关会接收请求转发请求 接收响应转发响应 而且还能提供非 http 协议服务。

## CDN

CDN 全称为内容分发网络 (Content Delivery Network)，它能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上，以提高用户访问网站的相应速度。

使用 CDN 的缺陷是需要注意缓存。修改可能不会立即生效，需要刷新缓存。

分发服务系统

分发服务系统的基元是 Cache 设备，它会同步源站点的内容并负责响应用户的访问请求，把缓存在本地的内容快速的提供给用户。

负载均衡系统

对发起请求的用户进行访问调度，确定提供给用户的最终实际访问地址。该系统分为全局负载均衡 (GSLB) 和本地负载均衡 (SLB)。GBLB 主要根据“就近原则”，通过对每个服务节点进行最优判断，向用户提供最合适的 Cache 设备。SLB 主要负责节点内部的设备负载均衡。

CDN 厂商做域名解析，它也是利用 DNS 的重定向技术，DNS 服务器会返回一个跟用户最接近的点的 IP 地址给用户，CDN 节点的服务器负责响应用户的请求，提供所需的内容，CDN 厂商的域名解析服务器用户量多，被访问的次数也多，域名解析服务器的 A 记录基本上会被各地运营商的 DNS 一直缓存着，所以服务效果也是最好的。
