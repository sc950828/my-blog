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

```js
// fetch方法返回一个Promise对象，可用then方法接收结果，用catch方法捕获异常，同Promise使用
// 配置对象具体配置
const options = {
  method: 'GET',      // 请求方法
  headers: {          // 头信息
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json'
  },
  body: JSON.stringify({  // 请求的 body 信息，Blob, FormData 等
    data: 1
  }),
  mode: 'cors',             // 请求的模式，cors、 no-cors 或 same-origin
  credentials: 'include',   // omit、same-origin 或 include。为了在当前域名内自动发送 cookie, 必须提供这个选项
  cache: 'no-cache',        // default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached
  redirect: 'follow',       // 可用的 redirect 模式: follow (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误), 或者 manual (手动处理重定向).
  referrer: 'no-referrer',  // no-referrer、client或一个 URL。默认是 client。
  referrerPolicy: 'no-referrer', // 指定 referer HTTP头
  integrity: 'sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=', // 包括请求的  subresource integrity 值
}
// 发起请求
fetch('http://biadu.com' [, config])
```

### 3、响应

then 的回调函数接受一个 Response 对象参数，其对象拥有 9 个属性，8 个方法

    9个属性

    type 只读 包含Response的类型 (例如, basic, cors)
    url 只读 包含Response的URL
    useFinalURL 包含了一个布尔值来标示这是否是该Response的最终URL
    status 只读 包含Response的状态码
    ok 只读 包含了一个布尔值来标示该Response成功(状态码200-299)
    redirected 只读 表示该Response是否来自一个重定向，如果是的话，它的URL列表将会有多个
    statusText 只读 包含了与该Response状态码一致的状态信息
    headers 只读 包含此Response所关联的Headers 对象
    bodyUsed Body 只读 包含了一个布尔值来标示该Response是否读取过Body

    8个方法

    clone 创建一个Response对象的克隆
    error 返回一个绑定了网络错误的新的Response对象
    redirect(url, status) 用另一个URL创建一个新的 response
    arrayBuffer 接受一个 Response 流, 并等待其读取完成. 并 resolve 一个 ArrayBuffer 对象
    blob  blob()方法使用一个 Response 流，并将其读取完成
    formData 将 Response 对象中的所承载的数据流读取并封装成为一个对象
    json 使用一个 Response 流，并将其读取完成。解析结果是将文本体解析为 JSON
    text 提供了一个可供读取的"返回流", 它返回一个包含USVString对象，编码为UTF-8
