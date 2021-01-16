### 什么是服务器端渲染 (SSR)？

将一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。

### 为什么使用服务器端渲染 (SSR)？

服务端渲染优点

更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。

更快的内容到达时间 (time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。

服务端渲染缺点

开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数 (lifecycle hook) 中使用；一些外部扩展库 (external library) 可能需要特殊处理，才能在服务器渲染应用程序中运行。

涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 (high traffic) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

### 预渲染

如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。

如果你使用 webpack，你可以使用 prerender-spa-plugin 轻松地添加预渲染。它已经被 Vue 应用程序广泛测试

### 基本用法

安装 vue 和 vue-server-renderer，并保持两者版本一致

```js
const Vue = require("vue");
const Server = require("express")();
// 读取模板
const Renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./index.template.html", "utf-8"),
});

Server.get("/server", (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>您访问的url是{{url}}</div>`,
  });

  const options = {
    title: "vue server render",
    meta: "<meta charset='utf-8'/>",
  };

  Renderer.renderToString(app, options)
    .then((html) => {
      res.end(html);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end("server error");
    });
});

Server.listen(8080, () => {
  console.log("server is running");
});
```

```html
<!-- 模板传参 利用 renderToString方法的第二个参数-->
<html>
  <head>
    <!-- 使用双花括号(double-mustache)进行 HTML 转义插值(HTML-escaped interpolation) -->
    <title>{{ title }}</title>

    <!-- 使用三花括号(triple-mustache)进行 HTML 不转义插值(non-HTML-escaped interpolation) -->
    {{{ meta }}}
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

### 注意

因为实际的渲染过程需要确定性，所以我们也将在服务器上“预取”数据 ("pre-fetching" data) - 这意味着在我们开始渲染时，我们的应用程序就已经解析完成其状态。也就是说，将数据进行响应式的过程在服务器上是多余的，所以默认情况下禁用。禁用响应式数据，还可以避免将「数据」转换为「响应式对象」的性能开销。

由于没有动态更新，所有的生命周期钩子函数中，只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用。这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行。

此外还需要注意的是，你应该避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码，例如在其中使用 setInterval 设置 timer。在纯客户端 (client-side only) 的代码中，我们可以设置一个 timer，然后在 beforeDestroy 或 destroyed 生命周期时将其销毁。但是，由于在 SSR 期间并不会调用销毁钩子函数，所以 timer 将永远保留下来。为了避免这种情况，请将副作用代码移动到 beforeMount 或 mounted 生命周期中。

通用代码不可接受特定平台的 API，因此如果你的代码中，直接使用了像 window 或 document，这种仅浏览器可用的全局变量，则会在 Node.js 中执行时抛出错误，反之也是如此。

### 开发源码结构

当编写纯客户端 (client-only) 代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。如果我们在多个请求之间使用一个共享的实例，很容易导致交叉请求状态污染。

因此，我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例

```js
// app.js
const Vue = require("vue");

module.exports = function createApp(context) {
  return new Vue({
    data: {
      url: context.url,
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`,
  });
};
```

```js
// server.js 每个请求对应一个vue实例
// 同样的规则也适用于 router、store 和 event bus 实例。
const createApp = require("./app");

server.get("*", (req, res) => {
  const context = { url: req.url };
  const app = createApp(context);

  renderer.renderToString(app, (err, html) => {
    // 处理错误……
    res.end(html);
  });
});
```

webpack 构建

对于客户端应用程序和服务器应用程序，我们都要使用 webpack 打包 - 服务器需要「服务器 bundle」然后用于服务器端渲染(SSR)，而「客户端 bundle」会发送给浏览器。

基本结构

```
src
├── components
│   ├── Foo.vue
│   ├── Bar.vue
│   └── Baz.vue
├── App.vue
├── app.js # 通用 entry(universal entry)
├── entry-client.js # 仅运行于浏览器
└── entry-server.js # 仅运行于服务器
```

```js
// app.js

import Vue from "vue";
import App from "./App.vue";

// 导出一个工厂函数，用于创建新的 应用程序、router 和 store 实例
export function createApp() {
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
  });
  return { app };
}
```

```js
// entry-client.js 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中
import { createApp } from "./app";

// 客户端特定引导逻辑……

const { app } = createApp();

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount("#app");
```

```js
// entry-server.js
import { createApp } from "./app";

export default (context) => {
  const { app } = createApp();
  return app;
};
```

### 路由和代码分割

```js
// router.js 我们也需要给每个请求一个新的 router 实例 所以文件导出一个 createRouter 函数
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      { path: "/", component: () => import("./components/Home.vue") },
      { path: "/item/:id", component: () => import("./components/Item.vue") },
    ],
  });
}
```

```js
// 新的app.js

import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

export function createApp() {
  // 创建 router 实例
  const router = createRouter();

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: (h) => h(App),
  });

  // 返回 app 和 router
  return { app, router };
}
```

```js
// entry-client.js
import { createApp } from "./app";

const { app, router } = createApp();

router.onReady(() => {
  app.$mount("#app");
});
```

```js
// entry-server.js
import { createApp } from "./app";

export default (context) => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    // 设置服务器端 router 的位置
    router.push(context.url);

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app);
    }, reject);
  });
};
```

```js
// server.js
// entry-server.js打包后的js
const createApp = require("/path/to/built-server-bundle.js");

server.get("*", (req, res) => {
  const context = { url: req.url };

  createApp(context).then((app) => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end("Page not found");
        } else {
          res.status(500).end("Internal Server Error");
        }
      } else {
        res.end(html);
      }
    });
  });
});
```

代码分割

将组件引用的方式改为 `const Foo = () => import('./Foo.vue')`

### 数据预取和状态

如果应用程序依赖于一些异步数据，那么在开始渲染过程之前，需要先预取和解析好这些数据。我们使用 vuex 管理数据。

```js
// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import { fetchItem } from "./api";

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
    },
    actions: {
      fetchItem({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then((item) => {
          commit("setItem", { id, item });
        });
      },
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      },
    },
  });
}
```

```js
// app.js 在里面注入store
import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
import { sync } from "vuex-router-sync";

export function createApp() {
  // 创建 router 和 store 实例
  const router = createRouter();
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  // 暴露 app, router 和 store。
  return { app, router, store };
}
```

```js
// Item.vue 在组件里面定义asyncData方法 用来调用action获取异步数据
<template>
  <div>{{ item.title }}</div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>
```

```js
// entry-server.js
import { createApp } from "./app";

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        matchedComponents.map((Component) => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            });
          }
        })
      )
        .then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state;

          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
```

```js
// entry-client.js
// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。
// 而在客户端，在挂载到应用程序之前，store 就应该获取到状态
const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
```

客户端数据预取

在客户端，处理数据预取有两种不同方式，在路由导航之前解析数据(router.beforeResolve)或者匹配要渲染的视图后，再获取数据(beforeMount/beforeRouteUpdate)
