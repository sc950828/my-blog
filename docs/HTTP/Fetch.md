### 1、fetch

- fetch(url, options)
- 优点
  - 使用更加简单，链式的异步处理(then)不会出现回调地狱。
  - 新增了跨域功能 在配置中，添加 mode： 'no-cors'就可以跨域了。
- 缺点
  - 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
  - 响应 res 当然它只是一个 HTTP 响应，而不是真的 JSON。为了获取 JSON 的内容，我们需要使用 await res.json()方法（在 Bodymixin 中定义，被 Request 和 Response 对象实现）。
  - fetch 默认不会带 cookie，如果要带上 cookie 的话需要添加配置项。

### 2、options

- method 设置请求方法
- body 传递参数
- headers 设置请求头
