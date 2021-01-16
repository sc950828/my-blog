## 样式

### 局部样式与全局样式

局部样式 一般都是使用 scoped 方案：

```
<style lang="scss" scoped>
  ...
</style>
```

全局样式

全局样式 目录：@/styles
variable.scss: 全局变量管理
mixins.scss: 全局 Mixins 管理
global.scss: 全局样式
其中 variable.scss 和 mixins.scss 会优先于 global.css 加载，并且可以不通过 import 的方式在项目中任何位置使用这些变量和 mixins。

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import '@/styles/variable.scss';
        @import '@/styles/mixins.scss';
        `,
      },
    },
  },
};
```

## 体验优化

### 页面载入进度条

使用 nprogress 对路由跳转时做一个伪进度条，这样做在网络不好的情况下可以让用户知道页面已经在加载了：

```js
import NProgress from "nprogress";

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});
```

### 美化滚动条

一直用 Mac 做前端，突然发现同事的 Windows 上出现了十分丑陋的滚动条，为了保持一致：

```js
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(#101F1C, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(#101F1C, 1);
}

```

### 静态资源加载页面

首次加载页面时，会产生大量的白屏时间，这时做一个 loading 效果看起来会很友好，其实很简单，直接在 public/index.html 里写一些静态的样式即可。

#### 移动端 100vh 问题

在移动端使用 100vh 时，发现在 Chrome、Safari 浏览器中，因为浏览器栏和一些导航栏、链接栏导致不一样的呈现：

你以为的 100vh === 视口高度

实际上 100vh === 视口高度 + 浏览器工具栏（地址栏等等）的高度

```js
// 安装 vh-check npm install vh-check --save
import vhCheck from "vh-check";
vhCheck("browser-address-bar");
```

定义一个 CSS Mixin

```scss
@mixin vh($height: 100vh) {
  height: $height;
  height: calc(#{$height} - var(--browser-address-bar, 0px));
}
```

## 组件库

### 覆盖 Ant Design Vue 样式

1.使用 .less 文件

Ant Design Vue 的样式使用了 Less 作为开发语言，并定义了一系列全局/组件的样式变量，所以需要安装了 less、less-loader，在 @/styles/antd-theme.less 可以覆盖默认样式。

优点是：
方便快捷，可以修改 class，覆盖默认变量。
缺点是：
必须引入 @import '~ant-design-vue/dist/antd.less'; ，引入后会将所有的组件样式全部引入，导致打包后的 css 体积达到 500kb 左右。

2.使用 JavaScript 对象
通过 JavaScript 对象的方式可以修改内置变量，需要对 Less 进行配置：

```js
// vue.config.js
const modifyVars = require("./src/styles/antdTheme.js");

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars,
        },
      },
    },
  },
};
```

这一步还可以继续优化，通过 babel-plugin-import 使 Ant Design Vue 的组件样式可以按需加载：

优点是：

可以按需引入，打包后的 CSS 体积取决于你引用了多少个组件。

缺点是：

不能使用 class 进行样式覆盖。

```js
// babel.config.js
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
    ],
  ],
};
```

### 干掉无用的图标

Ant Design Vue 把所有的 Icon 一次性引入（不管你因用了多少个组件），这使得体积打包后图标所占的体积竟然有几百 kb 之多。这些图标大多数不会被设计师所采纳，所以部分图标都应该被干掉：
创建一个 icons.js 来管理 Ant Design Vue 图标，这里以一个 Loading 图标为例：

```js
// @/src/assets/icons.js
export { default as LoadingOutline } from "@ant-design/icons/lib/outline/LoadingOutline";
```

如何知道你要加载的图标在什么路径下？
在 @ant-design/icons/lib 目录下有三种风格的图标，分别是 fill、outline、twotone，这里面内部的文件并不是 svg 格式，而是 js 和 ts 格式，这就是为什么我们可以这么引入图标的关键所在了。
下一步是通过配置 vue.config.js 将这个文件引入进来：

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(
          __dirname,
          "./src/assets/icons.js"
        ),
      },
    },
  },
};
```

### 解决 Moment 多国语

解决到这之后，Ant Design Vue 居然还很大，这是因为 moment 是 Ant Design Vue 中有强依赖该插件，所以使用 webpack 插件减小打包体积，这里我们只保留 zh-cn 语言包：

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin("ContextReplacementPlugin")
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/]);
  },
};
```

### 部分组件需要在页面内引用

Ant Design Vue 中部分体积较大的组件，例如 DatePicker，根据业务需求，应考虑在页面中进行加载，尽量保证首屏加载的速度：

```vue
<script>
import { DatePicker } from "ant-design-vue";
export default {
  components: {
    ADatePicker: DatePicker,
  },
};
</script>
```

### 异步请求

## 封装 Axios

1. 在 @/libs/request.js 路径下对 Axios 进行封装，封装了请求参数，请求头，以及错误提示信息、 request 拦截器、response 拦截器、统一的错误处理、baseURL 设置等。
2. 通过 VUE_APP_BASE_URL 区分线上与开发环境的 API 地址。
3. code 起到一个比较关键的作用，例如 token 过期时的验证。
4. 使用了一个叫 sotre 的包作为本地储存的工具用来存储 token。

```js
import axios from "axios";
import get from "lodash/get";
import storage from "store";
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error) => {
  const status = get(error, "response.status");
  switch (status) {
    /* eslint-disable no-param-reassign */
    case 400:
      error.message = "请求错误";
      break;
    case 401:
      error.message = "未授权，请登录";
      break;
    case 403:
      error.message = "拒绝访问";
      break;
    case 404:
      error.message = `请求地址出错: ${error.response.config.url}`;
      break;
    case 408:
      error.message = "请求超时";
      break;
    case 500:
      error.message = "服务器内部错误";
      break;
    case 501:
      error.message = "服务未实现";
      break;
    case 502:
      error.message = "网关错误";
      break;
    case 503:
      error.message = "服务不可用";
      break;
    case 504:
      error.message = "网关超时";
      break;
    case 505:
      error.message = "HTTP版本不受支持";
      break;
    default:
      break;
    /* eslint-disabled */
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config) => {
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `bearer ${storage.get("ACCESS_TOKEN")}`;
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  const dataAxios = response.data;
  // 这个状态码是和后端约定的
  const { code } = dataAxios;
  // 根据 code 进行判断
  if (code === undefined) {
    // 如果没有 code 代表这不是项目后端开发的接口
    return dataAxios;
    // eslint-disable-next-line no-else-return
  } else {
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (code) {
      case 200:
        // [ 示例 ] code === 200 代表没有错误
        return dataAxios.data;
      case "xxx":
        // [ 示例 ] 其它和后台约定的 code
        return "xxx";
      default:
        // 不是正确的 code
        return "不是正确的code";
    }
  }
}, errorHandler);

export default request;
```

### 跨域

跨域问题一般情况直接找后端解决了，你要是不好意思打扰他们的话，可以用 devServer 提供的 proxy 代理：

```js
// vue.config.js
devServer: {
  proxy: {
    '/api': {
      target: 'http://47.100.186.132/your-path/api',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

```

### Mock 数据

Mock 数据功能是基于 mock.js (opens new window)开发，通过 webpack 进行自动加载 mock 配置文件。

规则

1. 所有的 mock 配置文件均应放置在 @/mock/services 路径内。
2. 在 @/mock/services 内部可以建立业务相关的文件夹分类存放配置文件。
3. 所有的配置文件应按照 `***.mock.js`的命名规范创建。
4. 配置文件使用 ES6 Module 导出 export default 或 export 一个数组。

入口文件

```js
import Mock from "mockjs";

Mock.setup({
  timeout: "500-800",
});

const context = require.context("./services", true, /\.mock.js$/);

context.keys().forEach((key) => {
  Object.keys(context(key)).forEach((paramKey) => {
    Mock.mock(...context(key)[paramKey]);
  });
});
```

示例模板

```js
import Mock from "mockjs";

const { Random } = Mock;

export default [
  RegExp("/example.*"),
  "get",
  {
    "range|50-100": 50,
    "data|10": [
      {
        // 唯一 ID
        id: "@guid()",
        // 生成一个中文名字
        cname: "@cname()",
        // 生成一个 url
        url: "@url()",
        // 生成一个地址
        county: Mock.mock("@county(true)"),
        // 从数组中随机选择一个值
        "array|1": ["A", "B", "C", "D", "E"],
        // 随机生成一个时间
        time: "@datetime()",
        // 生成一张图片
        image: Random.dataImage("200x100", "Mock Image"),
      },
    ],
  },
];
```

## 路由

### Layout

布局暂时分为三大类：

frameIn：基于 BasicLayout，通常需要登录或权限认证的路由。

frameOut：不需要动态判断权限的路由，如登录页或通用页面。

errorPage：例如 404。

### 权限验证

通过获取当前用户的权限去比对路由表，生成当前用户具的权限可访问的路由表，通过 router.addRoutes 动态挂载到 router 上。

判断页面是否需要登陆状态，需要则跳转到 /user/login
本地存储中不存在 token 则跳转到 /user/login
如果存在 token，用户信息不存在，自动调用 vuex '/system/user/getInfo'

在路由中，集成了权限验证的功能，需要为页面增加权限时，在 meta 下添加相应的 key：

### auth

类型：Boolean
说明：当 auth 为 true 时，此页面需要进行登陆权限验证，只针对 frameIn 路由有效。

### permissions

类型：Object
说明：permissions 每一个 key 对应权限功能的验证，当 key 的值为 true 时，代表具有权限，若 key 为 false，配合 v-permission 指令，可以隐藏相应的 DOM。

```js
import router from "@/router";
import store from "@/store";
import storage from "store";
import util from "@/libs/utils";

// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const loginRoutePath = "/user/login";
const defaultRoutePath = "/home";

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start();
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 是否存有token作为验证是否登录的条件
    const token = storage.get("ACCESS_TOKEN");
    if (token && token !== "undefined") {
      // 是否处于登录页面
      if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath });
        // 查询是否储存用户信息
      } else if (Object.keys(store.state.system.user.info).length === 0) {
        store.dispatch("system/user/getInfo").then(() => {
          next();
        });
      } else {
        next();
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      });
      NProgress.done();
    }
  } else {
    // 不需要身份校验 直接通过
    next();
  }
});

router.afterEach((to) => {
  // 进度条
  NProgress.done();
  util.title(to.meta.title);
});
```
