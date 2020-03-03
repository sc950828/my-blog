### 1、什么是 cookie？
cookie 是服务端创建的保存在客户端的一小块数据(其实就是 sessionId)。
cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
cookie 是不可跨域的
每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，一级域名和二级域名之间是允许共享使用的（靠的是 domain）。
cookie 容量小，同一域名下的请求都会带上 cookie
Cookie 又分为了会话 Cookie 与持久 Cookie，要区分这两种类型，非常的简单，
持久 Cookie 就是我们设置了它的过期时间，而没设置过期时间的，都属于会话 Cookie

### 2、什么是 session?
session 是另一种记录服务器和客户端会话状态的机制
session 是基于 cookie 实现的，session 存储在服务器端 sessionId 会被存储到客户端的 cookie 中

### 3、cookie 和 session 的区别？
session 存储在服务端相较于 cookie 更安全，cookie 存储在客户端
cookie 只能存储字符串类型的数据，而 session 可以存储任何类型的数据
cookie 存储空间不能超过 4k，而 session 没有限制

### 4、token
访问资源接口（API）时所需要的资源凭证
简单的 token 由用户 id 时间戳 签名加密形成
特点
服务端无状态化(不必存储)、可扩展性好
支持移动端设备
每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存储 token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token

### 5、jwt
JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。是一种认证授权机制。
服务端无状态化(不必存储)、可扩展性好。jwt 包含用户基本信息,相比于 token jwt 更加无状态化，因为包含用户信息，所以不需要查询数据库。
每一次请求都需要携带 jwt，需要把 jwt 放到 HTTP 的 Header 里。Authoriation: Bearer + jwt
