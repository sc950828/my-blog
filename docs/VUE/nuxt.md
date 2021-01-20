## nuxt 文档

[nuxt 中文文档](https://www.nuxtjs.cn/guide)

## nuxt 简介

### Nuxt.js 是什么？

Nuxt.js 是一个基于 Vue.js 的通用应用框架。既可以做 spa 也可以做服务端渲染

### nuxt 注意点

需要注意的是，在任何 Vue 组件的生命周期内， 只有 beforeCreate 和 created 这两个方法会在 客户端和服务端被调用。其他生命周期函数仅在客户端被调用。

## nuxt 的安装

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

## 路由

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

## 视图

使用 `<nuxt />`显示视图 使用`<nuxt-child></nuxt-child>`显示子视图

页面默认的 layout 是 default.vue

## 请求使用 nuxt 的默认模块

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

## 使用预处理器

安装对应的包和 loader 就可以了

```shell
# 使用less sass同理
npm i less less-loader
```

公共样式配置在 nuxt.config.js 里面的 css 模块就可以了

## store

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

## Nuxt.js 为页面提供的特殊配置项

1. asyncData 最重要的一个键, 支持 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
2. fetch 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。详情请参考 关于 fetch 方法的文档。
3. head 配置当前页面的 Meta 标签, 详情参考 页面头部配置 API。
4. layout 指定当前页面使用的布局（layouts 根目录下的布局文件）。详情请参考 关于 布局 的文档。
5. loading 如果设置为 false，则阻止页面自动调用 this.$nuxt.$loading.finish()和 this.$nuxt.$loading.start(),您可以手动控制它,请看例子,仅适用于在 nuxt.config.js 中设置 loading 的情况下。请参考 API 配置 loading 文档。
6. transition 指定页面切换的过渡动效, 详情请参考 页面过渡动效。
7. scrollToTop 布尔值，默认: false。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于 嵌套路由的应用场景。
8. validate 校验方法用于校验 动态路由的参数。
9. middleware 指定页面的中间件，中间件会在页面渲染之前被调用， 请参考 路由中间件。
   关于页面配置项的详细信息，请参考 页面 API。

## asyncData fetch 区别

asyncDatat 提前获取数据返回对象和 data 合并提供基础数据

fetch 提前组装好 store 里面的数据 不返回对象

## keep-alive

在 `<nuxt />或<nuxt-child />`里面使用 keep-alive`<nuxt keep-alive /> 或 <nuxt-child keep-alive />`

## 别名

```
别名  目录
~ 或 @ srcDir
~~ 或 @@ rootDir
默认情况下，srcDir 和 rootDir 相同。
```

在您的 vue 模板中, 如果你需要引入 assets 或者 static 目录, 使用 ~/assets/your_image.png 和 /static/your_image.png 方式。

从 Nuxt 2.0 开始，~/alias 将无法在 CSS 文件中正确解析。你必须在 url CSS 引用中使用~assets（没有斜杠）或@别名，即 background:url("~assets/banner.svg")

static 下面的文件直接用/xxx 引入 不会被 webpack 处理
