1、fetch
  fetch(url, options)
  优点
    使用更加简单，链式的异步处理(then)不会出现回调地狱。
    新增了跨域功能 在配置中，添加mode： 'no-cors'就可以跨域了。
  缺点
    当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。
    相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
    响应res当然它只是一个 HTTP 响应，而不是真的JSON。为了获取JSON的内容，我们需要使用await res.json()方法（在Bodymixin 中定义，被 Request 和 Response 对象实现）。
    fetch默认不会带cookie，如果要带上cookie的话需要添加配置项。

2、options
  method 设置请求方法
  body 传递参数
  headers 设置请求头

3、axios
  axios是一个基于promise的HTTP库，可以用在浏览器和 node.js 中。它本质也是对原生XMLHttpRequest的封装，只不过它是Promise的实现版本，符合最新的ES规范。
  优点
    从浏览器中创建XMLHttpRequests
    可在 node.js 中使用
    支持 Promise API
    提供了并发请求的接口
    拦截请求和响应
    转换请求数据和响应数据
    取消请求
    自动转换 JSON 数据
    客户端支持防御 XSRF
  缺点
    新东西 兼容性不太好 只支持现代浏览器
