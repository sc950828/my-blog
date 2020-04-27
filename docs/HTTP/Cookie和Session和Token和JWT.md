### 1、什么是 cookie？有哪些特点？

- cookie 是服务端创建的保存在客户端的一小块数据(其实就是 sessionId)。
- cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
- cookie 是不可跨域的。每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，一级域名和二级域名之间是允许共享使用的（靠的是 domain）。
- cookie 容量小，一般只能存储 4k 大小的数据。同一域名下的请求都会带上 cookie
- Cookie 又分为了会话 Cookie 与持久 Cookie，要区分这两种类型，非常的简单，持久 Cookie 就是我们设置了它的过期时间，而没设置过期时间的，都属于会话 Cookie。
- 服务器端可以使用 Set-Cookie 的响应头部来配置 cookie 信息。
- 在发生 xhr 的跨域请求的时候，即使是同源下的 cookie，也不会被自动添加到请求头部，除非显示地规定。
- 获取 cookie document.cookie
- 设置 cookie document.cookie='name=xiaoming;expires=xx'
- 10 个属性
  name 表示设置的 cookie 名也就是 key，不能重复，不可更改
  value 表示设置 cookie 的值
  expires 指定了 cookie 失效的时间。
  max-age 指定了 cookie 多久后失效，单位是秒，从浏览器收到报文开始计算。正数为失效时间，负数表示当前 cookie 在浏览器关闭时失效，0 表示删除 cookie。
  domain 是域名。多级域名不可交换 cookie，如果设置以点开头的域名，则所有子域名可以访问，如设置.baidu.com，则 a.baidu.com 可访问其上级域名的 cookie
  path 是路径，表示 cookie 所能使用的路径，默认'/'路径，只要满足当前匹配路径以及子路径都可以共享 cookie。domain 和 path 一起限制了 cookie 能够被哪些 url 访问。
  secure 规定了 cookie 只能在确保安全的情况下传输，即只能通过 HTTPS 传输 cookie。
  HttpOnly 规定了这个 cookie 只能被服务器访问，不能使用 js 脚本访问。这也是预防 XSS 攻击的重要手段。
  same-site 规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击

### 2、cookie 的缺点是什么？

容量缺陷。Cookie 的体积上限只有 4KB，只能用来存储少量的信息。

性能缺陷。Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过 Domain 和 Path 指定作用域来解决。

安全缺陷。由于 Cookie 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在 Cookie 的有效期内重新发送给服务器，这是相当危险的。另外，在 HttpOnly 为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。

### 3、什么是 session?

- session 是另一种记录服务器和客户端会话状态的机制
- session 是基于 cookie 实现的，session 存储在服务器端 sessionId 会被存储到客户端的 cookie 中

### 4、cookie 和 session 的区别？

- session 存储在服务端相较于 cookie 更安全，cookie 存储在客户端
- cookie 只能存储字符串类型的数据，而 session 可以存储任何类型的数据
- cookie 存储空间不能超过 4k，而 session 没有限制

### 5、token

- 访问资源接口（API）时所需要的资源凭证，简单的 token 由用户 id 时间戳 签名加密形成。
- 特点
  - 服务端无状态化(不必存储)、可扩展性好
  - 支持移动端设备
  - 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
  - 基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存储 token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
  - 移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token

### 6、jwt

- JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。是一种认证授权机制。服务端无状态化(不必存储)、可扩展性好。jwt 包含用户基本信息,相比于 token jwt 更加无状态化，因为包含用户信息，所以不需要查询数据库。
- 每一次请求都需要携带 jwt，需要把 jwt 放到 HTTP 的 Header 里。Authoriation: Bearer + jwt

### 7、什么是 Cookie 隔离？（或者说：请求资源的时候不要让它带 cookie 怎么做）

网站向服务器请求的时候，会自动带上 cookie 这样增加表头信息量，使请求变慢。

如果静态文件都放在主域名下，那静态文件请求的时候都带有的 cookie 的数据提交给 server 的，非常浪费流量，所以不如隔离开，静态资源放 CDN 。

因为 cookie 有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有 cookie 数据，这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

同时这种方式不会将 cookie 传入 Web Server，也减少了 Web Server 对 cookie 的处理分析环节，提高了 webserver 的 http 请求的解析速度。

### 8、cookie 的新属性 SameSite

SameSite 可以设置为三个值，Strict、Lax 和 None。

- 在 Strict 模式下，浏览器完全禁止第三方请求携带 Cookie。比如请求 sanyuan.com 网站只能在 sanyuan.com 域名当中请求才能携带 Cookie，在其他网站请求都不能。
- 在 Lax 模式，就宽松一点了，但是只能在 get 方法提交表单况或者 a 标签发送 get 请求的情况下可以携带 Cookie，其他情况均不能。
- 在 None 模式下，也就是默认模式，请求会自动携带上 Cookie。
