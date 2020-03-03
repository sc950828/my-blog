### 1、axios 是什么？

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

### 2、axios 的优点有哪些？

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

### 3、方法的使用

- axios(config).then((res) => {}).catch((err) => {})
- 别名方法，使用别名方法的时候 config 可以省略，并且 url、method、data 这些属性都不必在配置中指定。
  - axios.get(url, config).then((res)=> {}).catch((err) => {}) 如果参数不在 url 后面可以 axios.get(url, {params:{xx:xx}}, config)这样写。不能传 data
  - axios.post(url, data, config).then((res)=> {}).catch((err) => {})
  - axios.put(url, data, config).then((res)=> {}).catch((err) => {})
  - axios.delete(url, config).then((res)=> {}).catch((err) => {})。如果参数不在 url 后面可以 axios.delete(url, {params:{xx:xx}}, config)这样写。不能传 data
- 注意
  - get post put delete 都能传路径参数 ?id=xxx 或者 path/xxx 后台通过 req.query 或者 req.params 获取参数
  - 只有 post put 才能传 data 参数，get delete 传不了，get delete 只能传路径参数。
  - 使用{params:{xx:xx}}传参只有 get delete 请求适用，会自动拼接到 url 后。如果用在 post put 会被当做参数。
  - post put 请求 content-type 默认是 application/json;charset=utf-8

### 4、请求 config 的配置

    {
      // `url` 是用于请求的服务器 URL
      url: '/user',

      // `method` 是创建请求时使用的方法
      method: 'get', // 默认是 get

      // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
      // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
      baseURL: 'https://some-domain.com/api/',

      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理

        return data;
      }],

      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [function (data) {
        // 对 data 进行任意转换处理

        return data;
      }],

      // `headers` 是即将被发送的自定义请求头 设置请求参数类型content-type
      headers: {'X-Requested-With': 'XMLHttpRequest'},

      // `params` 是即将与请求一起发送的 URL 参数  get delete请求的时候参数如果不放在url后就可以使用params
      // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
      params: {
        ID: 12345
      },

      // `paramsSerializer` 是一个负责 `params` 序列化的函数
      // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },

      // `data` 是作为请求主体被发送的数据 后台通过req.body获取到参数
      // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
      // 在没有设置 `transformRequest` 时，必须是以下类型之一：
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - 浏览器专属：FormData, File, Blob
      // - Node 专属： Stream
      data: {
        firstName: 'Fred'
      },

      // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
      // 如果请求话费了超过 `timeout` 的时间，请求将被中断
      timeout: 1000,

      // `withCredentials` 表示跨域请求时是否需要使用凭证
      withCredentials: false, // 默认的

      // `adapter` 允许自定义处理请求，以使测试更轻松
      // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
      adapter: function (config) {
        /* ... */
      },

      // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
      // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
      auth: {
        username: 'janedoe',
        password: 's00pers3cret'
      },

      // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json', // 默认的

      // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
      xsrfCookieName: 'XSRF-TOKEN', // default

      // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
      xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

      // `onUploadProgress` 允许为上传处理进度事件
      onUploadProgress: function (progressEvent) {
        // 对原生进度事件的处理
      },

      // `onDownloadProgress` 允许为下载处理进度事件
      onDownloadProgress: function (progressEvent) {
        // 对原生进度事件的处理
      },

      // `maxContentLength` 定义允许的响应内容的最大尺寸
      maxContentLength: 2000,

      // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
      validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
      },

      // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
      // 如果设置为0，将不会 follow 任何重定向
      maxRedirects: 5, // 默认的

      // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
      // `keepAlive` 默认没有启用
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),

      // 'proxy' 定义代理服务器的主机名称和端口
      // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
      // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
      proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: : {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },

      // `cancelToken` 指定用于取消请求的 cancel token
      // （查看后面的 Cancellation 这节了解更多）
      cancelToken: new CancelToken(function (cancel) {
      })
    }

### 5、响应信息结构

    {
      // `data` 由服务器提供的响应
      data: {},

      // `status` 来自服务器响应的 HTTP 状态码
      status: 200,

      // `statusText` 来自服务器响应的 HTTP 状态信息
      statusText: 'OK',

      // `headers` 服务器响应的头
      headers: {},

      // `config` 是为请求提供的配置信息
      config: {}
    }
    这些都可以在then方法中使用res.得到

### 6、设置 axios 的默认配置

- axios.defaults.baseURL = 'https://api.example.com';
- axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
- 配置的顺序会由后面的覆盖前面的，比如设置了默认的而且又在请求的 config 中设置了相同的配置，则在请求中的配置会覆盖默认的配置。

### 7、创建 axios 实例

```js
var instance = axios.create({
  baseURL: "https://api.example.com"
});
```

### 8、拦截器 在转换数据方法的前面执行

```js
// 添加请求拦截器 在请求转换之前执行
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器 在响应转换之前执行
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 移除拦截器
var myInterceptor = axios.interceptors.request.use(function() {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);
```

### 9、并行请求

```js
axios.all([getUserAccount(), getUserPermissions()]).then(
  axios.spread(function(acct, perms) {
    // 两个请求现在都执行完成 参数是请求的结果一一对应
  })
);
```
