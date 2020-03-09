### 1、说说你对 SPA 单页面的理解，它的优缺点分别是什么？

- SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
- 优点：
  - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
  - 基于上面一点，SPA 相对对服务器压力小；
  - 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
- 缺点：
  - 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
  - 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
  - SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

### 2、Class 与 Style 如何动态绑定？

```js
  Class对象语法：
    <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
    data: {
      isActive: true,
      hasError: false
    }
  Class数组语法：
    <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
    data: {
      activeClass: 'active',
      errorClass: 'text-danger'
    }
  Style对象语法：
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    data: {
      activeColor: 'red',
      fontSize: 30
    }
  Style数组语法：
    <div v-bind:style="[styleColor, styleSize]"></div>
    data: {
      styleColor: {
        color: 'red'
      },
      styleSize:{
        fontSize:'23px'
      }
    }
```

### 3、怎样理解 Vue 的单向数据流？

- 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。子组件想修改时，只能通过 \$emit 派发一个自定义事件，父组件接收到后，由父组件修改。
- 有两种常见的试图改变一个 prop 的情形 :
  - 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值
  - 这个 prop 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

### 4、computed 和 watch 的区别和运用的场景？

- computed：是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；
- watch：更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；当我们需要在数据变化时执行异步或开销较大的操作时使用。

### 5、Vue 的父组件和子组件生命周期钩子函数执行顺序？

- 加载渲染过程
  - 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
- 子组件更新过程
  - 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 父组件更新的过程
  - 父 beforeUpdate -> 父 updated
- 销毁过程
  - 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 6、在哪个生命周期内调用异步请求？

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

### 7、在什么阶段才能访问操作 DOM？

mounted

### 8、父组件可以监听到子组件的生命周期吗？

- 可以，并且有两种方法实现。
- 第一种
  - 在子组件的生命周期函数里面\$emit 事件出来，在父组件里面监听
- 第二种
  - 在父组件里面监听@hock 生命周期函数，比如@hock:beforeCreate="xxx"。生命周期函数都能使用该方法监听。

### 9、谈谈你对 keep-alive 的了解？

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

### 10、v-model 的原理？

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 属性和 change 作为事件。
- 如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，我们可以在组件中使用 model 更改默认属性和事件 model:{prop:'xxx', event:'xxx'}

### 11、Vue 组件间通信有哪几种方式？

- 1. props / \$emit 适用 父子组件通信
- 2. ref 与 $parent / $children 适用 父子组件通信。ref 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- 3. provide / inject 适用于 隔代组件通信
- 4. EventBus （$emit / $on） 适用于 父子、隔代、兄弟组件通信。通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件
- 5. Vuex 适用于 父子、隔代、兄弟组件通信

### 12、SSR 服务端渲染

    优点
      更好的SEO
      渲染更快
    缺点
      加大了服务器压力
      开发有限制，比如只有beforeCreate和created生命后期函数

### 13、vue-router 路由模式有几种？

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

### 14、能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

- 1. hash 模式的实现原理
  - URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
  - hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 hash 的切换；
  - 可以通过  a  标签，并设置  href  属性，当用户点击这个标签后，URL  的 hash 值会发生改变；或者使用  JavaScript 来对  loaction.hash  进行赋值，改变 URL 的 hash 值；
  - 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。
- 2. history 模式的实现原理
  - history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录，但是不会被 popstate 事件监听。
  - 主动的我们可以通过 pushState 和 repalceState 两个 API 来操作实现 URL 的变化，然后手动触发页面跳转（渲染）。
  - 被动的我们可以通过 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）
  - 该模式需要后端配置。

### 15、vue 如何实现数据的双向绑定?

- 视图变化->数据变化采用的事件监听，比如 input 事件
- 数据快画->视图变化 就是 vue.js 则是采用数据劫持结合发布-订阅模式的方式。
  - 1. 使用 Object.defineProperty()方法给 data 对象属性都加上 setter 和 getter 方法。
  - 2. 解析 Vue 模板指令，将模板中的变量都替换成数据，数据获取初始值得时候调动 getter 方法，成为该属性的订阅者，添加到该属性的发布者数组里面 dep 里面
  - 3. 数据变化触发属性的 setter 方法，然后发布者通知所有的订阅者进行数据更新。

### 16、Vue 框架怎么实现对象和数组的监听？

Object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持。对对象采用遍历加递归的方式进行劫持。对数组采用遍历的方式进行劫持，同时 Vue 通过原型拦截的方式重写了数组的 7 个方法。unshift shift pop push splice reverse sort

### 17、Vue 怎么用 vm.\$set() 解决对象新增属性不能响应的问题 ？

- 如果是数组则采用 splice 方法把该属性和值添加到数组里面
- 如果是对象
  - 判断该属性是否已经在对象上，如果在直接赋值
  - 判断对象是否是响应式，不是响应式直接赋值
  - 如果对象是响应式并且该属性在对象上没有则使用封装的 defineProperty 方法进行响应式处理

### 18、虚拟 DOM 实现原理？

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

### 19、vue3.0 特性

- 源码采用 typescript 编写
- 数据劫持由 Object.defineProperty 改为 proxy
