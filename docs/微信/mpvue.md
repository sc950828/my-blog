### 原生小程序开发缺陷

较高的学习成本

ide 支持不够友好 只能使用微信开发者工具

多端小程序需要重复开发

无法与现有的流行的框架相结合

### mpvue

mpvue 继承自 Vue.js，其技术规范和语法特点与 Vue.js 保持一致。

可以一套代码可以直接跑在多端：WEB、小程序（微信和支付宝）、Native（借助 weex）。

### 框架原理

- mpvue 保留了 vue.runtime 核心方法，无缝继承了 Vue.js 的基础能力
- mpvue-template-compiler 提供了将 vue 的模板语法转换到小程序的 wxml 语法的能力
- 修改了 vue 的构建配置，使之构建出符合小程序项目结构的代码格式： json/wxml/wxss/js 文件

### 生命周期

我们会在小程序 onReady 后，再去触发 vue mounted 生命周期。

vue 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- activated
- deactivated
- beforeDestroy
- destroyed

除了 vue 的生命周期方法外，还有微信小程序的生命周期， 除特殊情况外，不建议使用小程序的生命周期钩子。

小程序的生命周期

app 部分：

- onLaunch，初始化
- onShow，当小程序启动，或从后台进入前台显示
- onHide，当小程序从前台进入后台
- onError，出错时调用

page 部分：

- onLoad，监听页面加载 只执行一次
- onShow，监听页面显示 多次执行
- onReady，监听页面初次渲染完成 只执行一次
- onHide，监听页面隐藏 多次执行
- onUnload，监听页面卸载
- onPullDownRefresh，监听用户下拉动作
- onReachBottom，页面上拉触底事件的处理函数
- onShareAppMessage，用户点击右上角分享
- onPageScroll，页面滚动
- onTabItemTap, 当前是 tab 页时，点击 tab 时触发 （mpvue 0.0.16 支持）
- onResize 页面尺寸变化时执行

小程序生命周期步骤

onLaunch onShow beforeCredte created onLoad onShow onReady beforeMount mounted

页面切换只触发 onShow 和 onHide

### 语法支持

几乎全支持 官方文档：模板语法，下面讲下不支持的情况。

不支持 纯-HTML 小程序里没有 BOM 和 DOM 所以不能使用 v-html 指令

`{{}}`不支持部分复杂的 JavaScript 渲染表达式 目前可以使用的有 `+ - * % ?: ! == === > < [] .,`剩下的还待完善。

不支持过滤器 渲染部分会转成 wxml ，wxml 不支持过滤器，所以这部分功能不支持。

不支持直接调用函数 不支持在 template 内使用 methods 中的函数。

暂不支持在组件上使用 Class 与 Style 绑定

嵌套循环的时候必须指定不同的索引！

```html
<!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同，正确的写法如下 -->
<template>
  <ul v-for="(card, index) in list">
    <li v-for="(item, itemIndex) in card">
      {{item.value}}
    </li>
  </ul>
</template>
```

vue 组件

详细的不支持列表：

- 暂不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性(例：`<card class="class-name"> </card>` 样式是不会生效的)，因为编译到 wxml，小程序不会生成节点，建议写在内部顶级元素上。
- Slot（scoped 暂时还没做支持）
- 动态组件
- 异步组件
- inline-template
- X-Templates
- keep-alive
- transition
- class
- style

小程序组件

mpvue 可以支持小程序的原生组件，比如： picker,map 等，需要注意的是原生组件上的事件绑定，需要以 vue 的事件绑定语法来绑定，如 bindchange="eventName" 事件，需要写成 @change="eventName"

### 事件

几乎全支持啦 官方文档：事件处理器

```js
// 事件映射表，左侧为 WEB 事件，右侧为 小程序 对应事件
{
  click: 'tap',
  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchcancel: 'touchcancel',
  touchend: 'touchend',
  tap: 'tap',
  longtap: 'longtap',
  input: 'input',
  change: 'change',
  submit: 'submit',
  blur: 'blur',
  focus: 'focus',
  reset: 'reset',
  confirm: 'confirm',
  columnchange: 'columnchange',
  linechange: 'linechange',
  error: 'error',
  scrolltoupper: 'scrolltoupper',
  scrolltolower: 'scrolltolower',
  scroll: 'scroll'
}
```

事件修饰符

- .stop 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！
- .prevent 可以直接干掉，因为小程序里没有什么默认事件，比如 submit 并不会跳转页面
- .capture 支持 1.0.9
- .self 没有可以判断的标识
- .once 也不能做，因为小程序没有 removeEventListener, 虽然可以直接在 handleProxy 中处理，但非常的不优雅，违背了原意，暂不考虑
- 其他 键值修饰符 等在小程序中压根没键盘，所以。。。

### 最佳实践

1. 精简 data 数据

冗余数据不要挂在 data 里，所有在 data/props/computed 中的数据，每次变更都会从微信小程序的 JSCore 进程，通过 setData 序列化成字符串后发送到 JSRender 进程。所以，如果你的数据量巨大的时候，会导致页面非常卡顿。

2. 优化长列表性能

一般情况下这种页面会有大量的数据，除了遵从上面的建议外还有额外的建议。

- 避免在 v-for 中嵌套子组件，这样可以优化大部分部分 setData 时的冗余数据。
- 通过实践发现 wx:if 和 hidden 的优化肉眼不可见，所以或许可以试试直接通过样式 display 来展示和隐藏。
- 如果列表过长，强烈建议产品思考更好的展示形态。比如只展示热门，多余的折叠等形式。

3. 合理使用双向绑定 mpvue 建议使用 v-model.lazy 绑定方式以优化性能，此外 v-model 在老基础库下输入框输入时可能存在光标重设的问题。

4. 谨慎选择直接使用小程序的 API 如果你有小程序和 H5 复用代码的需要，业务代码需要保持对 WEB Vue.js 的兼容性。此时我们不建议在代码中直接调用小程序 API，更好的选择是通过桥接适配层屏蔽两端差异。

### 常见问题

1. 如何获取小程序在 page onLoad 时候传递的 options

在所有 页面 的组件内可以通过 this.$root.$mp.query 进行获取。

2. 如何获取小程序在 app onLaunch/onShow 时候传递的 options

在所有的组件内可以通过 this.$root.$mp.appOptions 进行获取。

3. 如何捕获 app 的 onError

由于 onError 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，在 app 的根组件上添加名为 onError 的回调函数即可。

### 使用路由

使用 mpvue-router-patch 插件就可以使用路由了，类似 vue 的 vue-router

安装

npm i mpvue-router-patch -S

在 main.js 中使用

```js
// main.js
import Vue from "vue";
import MpvueRouterPatch from "mpvue-router-patch";

Vue.use(MpvueRouterPatch);
```

Router 实例属性

- `$router.app` 当前页面的 Vue 实例
- `$router.mode` 路由使用的模式，固定值 history
- `$router.currentRoute` 当前路由对应的路由信息对象，等价于 \$route

跳转到应用内的某个页面，mpvue.navigateTo、mpvue.switchTab 及 mpvue.reLaunch 均通过该方法实现，location 参数支持字符串及对象两种形式，跳转至 tabBar 页面或重启至某页面时必须以对象形式传入

```js
// 字符串
router.push("/pages/news/detail");

// 对象
router.push({ path: "/pages/news/detail" });

// 带查询参数，变成 /pages/news/detail?id=1
router.push({ path: "/pages/news/detail", query: { id: 1 } });

// 切换至 tabBar 页面
router.push({ path: "/pages/news/list", isTab: true });

// 重启至某页面，无需指定是否为 tabBar 页面，但 tabBar 页面无法携带参数
router.push({ path: "/pages/news/list", reLaunch: true });

// 关闭当前页面，跳转到应用内的某个页面，相当于 mpvue.redirectTo，location 参数格式与 $router.push 相似，不支持 isTab 及 reLaunch 属性
$router.replace(location);

// 关闭当前页面，返回上一页面或多级页面，n 为回退层数，默认值为 1
$router.go(n);

// 关闭当前页面，返回上一页面
$router.back();
```

路由信息对象

`$route.path` 字符串，对应当前路由的路径，总是解析为绝对路径，如 /pages/news/list

`$route.params` 空对象，小程序不支持该属性

`$route.query`一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /pages/news/detail?id=1，则有 `$route.query.id == 1`，如果没有查询参数，则是个空对象。

`$route.hash` 空字符串，小程序不支持该属性

`$route.fullPath` 完成解析后的 URL，包含查询参数和 hash 的完整路径

`$route.name` 当前路由的名称，由 path 转化而来

### 使用 scss

安装

npm i -D sass-loader node-sass

```scss
// 直接使用
.img {
  width: 100%;
}
```

### 使用 flyio 处理请求

安装

npm i -S flyio

```js
// 初始化flyio
function createFly() {
  if (mpvuePlatform === "wx") {
    const Fly = require("flyio/dist/npm/wx");
    return new Fly();
  } else {
    return null;
  }
}

// 处理get请求
export function get(url, params = {}) {
  const fly = createFly();
  if (fly) {
    return new Promise((resolve, reject) => {
      fly
        .get(url, params)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          handleError(err);
          reject(err);
        });
    });
  }
}

// 处理post请求
export function post(url, params = {}) {
  const fly = createFly();
  if (fly) {
    return new Promise((resolve, reject) => {
      fly
        .post(url, params)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          handleError(err);
          reject(err);
        });
    });
  }
}
```
