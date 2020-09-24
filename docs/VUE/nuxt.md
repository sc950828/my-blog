### Nuxt.js 是什么？

Nuxt.js 是一个基于 Vue.js 的通用应用框架。既可以做 spa 也可以做服务端渲染

### nuxt 的安装

一般我们使用 create-nuxt-app 创建项目

```shell
npx create-nuxt-app projectName

cd projectName

# 开发模式下
npm run dev

# 生产环境下
npm run build
npm start
```

### 路由

普通路由可以不用配置 根据文件夹和文件名定位到路由。页面都在 pages 文件夹下面。

文件夹下自动定位到 index.vue 文件。例如/pages/parent/index.vue 路由就是/parent 如果是/pages/parent/child.vue 路由就是/parent/child

路由 name 就是文件的名字

如果需要自定义路由 修改 name 和 path 就可以去 nuxt.config.js 里面的 router 字段配置 extendRoutes

```js
router: {
  extendRoutes (routes, resolve) {
    routes.push({
      name: 'about2',
      path: '/about2',
      component: resolve(__dirname, 'pages/about1/child.vue')
    })
  }
}
```

`_`文件名表示的是动态路由参数

使用`<nuxt-link></nuxt-link>`进行路由跳转

### 视图

使用 `<nuxt />`显示视图 使用`<nuxt-child></nuxt-child>`显示子视图

页面默认的 layout 是 default.vue

### 请求使用 nuxt 的默认模块

```shell
npm i @nuxtjs/axios

# 在nuxt.config.js里面modules里面配置
modules: [
  '@nuxtjs/axios'
]

# 使用
asyncData({app}) {
  app.$axios.get()
}
```

### 使用预处理器

安装对应的包和 loader 就可以了

```shell
# 使用less sass同理
npm i less less-loader
```

公共样式配置在 nuxt.config.js 里面的 css 模块就可以了

### store

store 文件夹下有文件会自动使用 vuex

store 文件夹下的 index.js 是根

其他名字的 js 是模块

文件里的 state 一定要是有个函数返回对象 避免污染 类似 data 返回对象

```js
// 例如 store文件夹下有index.js和user.js

new Vuex.Store({
  state: () => ({
    counter: 0,
  }),
  mutations: {
    increment(state) {
      state.counter++;
    },
  },
  modules: {
    user: {
      namespaced: true,
      state: () => ({
        list: [],
      }),
      mutations: {
        add(state, { text }) {
          state.list.push({
            text,
            done: false,
          });
        },
        remove(state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1);
        },
        toggle(state, { todo }) {
          todo.done = !todo.done;
        },
      },
    },
  },
});
```

### asyncData fetch

asyncDatat 提前获取数据返回对象和 data 合并提供基础数据

fetch 提前组装好 store 里面的数据 不返回对象
