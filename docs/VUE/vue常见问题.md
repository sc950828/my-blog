### 什么是 MVC MVP MVVM？

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化我们的开发效率。
一种架构模式往往使用了多种设计模式。

- MVC

  - 模型（Model） - Model 层用于封装和应用程序的业务逻辑相关的数据以及对数据的处理方法。一旦数据发生变化，模型将通知有关的视图。
  - 视图（View） - View 作为视图层，主要负责数据的展示,并且响应用户操作.
  - 控制器（Controller）- 控制器是模型和视图之间的纽带，接收 View 传来的用户事件并且传递给 Model，同时利用从 Model 传来的最新模型控制更新 View.

  - View 接受用户交互请求
  - View 将请求转交给 Controller
  - Controller 操作 Model 进行数据更新
  - 数据更新之后，Model 通知 View 更新数据变化.导致了 View 与 Model 之间的紧耦合。
  - 所有方式都是单向通信。

- MVP

  - MVP 只是将 MVC 中的 Controller 变成了 Presenter
  - 与 mvc 不同的是 mvp 是双向通信，V—>P—>M，M—>P—>V。这样 view 层跟 model 层就没有耦合，实现了解耦。
  - Presenter 中除了业务逻辑以外，还有大量的 View->Model，Model->View 的手动同步逻辑，造成 Presenter 比较笨重，维护起来会比较困难。

- MVVM

  - 从前端的角度分析。ViewModel 是由前端开发人员组织生成和维护的视图数据层，通过数据来驱动视图，开发者只需要操作数据，视图自动更新，view 层对数据的修改内部通过事件监听完成。没有 dom 操作。将 View 和 Model 的同步更新给自动化了。这就是简化了 MVP 模式中的 Presenter。把 mvc 模式中的 controller 层用 viewModel 替换掉了。没有了对没有 dom 操作，全部由框架处理。vue2 中的 viewModel 通过 Object.defineProperty 实现，vue3 通过 Proxy 和 reflect 来实现。
  - View，View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。
  - Model 层前端来说就是后端提供的 api 接口里面的数据，vue 就是 data 里面的数据。

### 说说你对 SPA 单页面的理解，它的优缺点分别是什么？

- SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
- 优点：
  - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
  - 基于上面一点，SPA 相对对服务器压力小；
  - 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
- 缺点：
  - 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
  - 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
  - SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

### new Vue()经历了什么？

当 new Vue()后，首先会初始化事件和生命周期，接着会执行 beforeCreate 生命周期钩子，在这个钩子里面还拿不到 this.$el和this.$data;接着往下走会初始化 inject 和将 data 的数据进行侦测也就是进行双向绑定；接着会执行 create 钩子函数，在这个钩子里面能够拿到 this.$data还拿不到this.$el;到这里初始化阶段就走完了。然后会进入一个模版编译阶段，在这个阶段首先会判断有没有 el 选项如果有的话就继续往下走，如果没有的话会调用 vm.$mount(el);接着继续判断有没有template选项，如果有的话，会将template提供的模版编译到render函数中；如果没有的话，会通过el选项选择模版；到这个编译阶段就结束了。（温馨提示：这个阶段只有完整版的Vue.js才会经历，也是就是通过cmd引入的方式；在单页面应用中，没有这个编译阶段，因为vue-loader已经提前帮编译好，因此，单页面使用的vue.js是运行时的版本）。模版编译完之后（这里说的是完整版，如果是运行时的版本会在初始化阶段结束后直接就到挂载阶段），然后进入挂载阶段，在挂在阶段首先或触发beforeMount钩子，在这个钩子里面只能拿到this.$data 还是拿不到 this.$el;接着会执行mounted钩子，在这个钩子里面就既能够拿到this.$el 也能拿到 this.$data；到这个挂载阶段就已经走完了，整个实例也已经挂载好了。当数据发生变更的时候，就会进入更新阶段，首先会触发beforeUpdate钩子，然后触发updated钩子，这个阶段会重新计算生成新的Vnode,然后通过patch函数里面的diff算法,将新生成的Vnode和缓存中的旧Vnode进行一个比对，最后将差异部分更新到视图中。当vm.$destory 被调用的时候，就会进入卸载阶段，在这个阶段，首先触发 beforeDestory 钩子接着触发 destoryed 钩子，在这个阶段 Vue 会将自身从父组件中删除，取消实例上的所有追踪并且移除所有的事件监听。到这里 Vue 整个生命周期就结束了。

### Vue 的父组件和子组件生命周期钩子函数执行顺序？

- 加载渲染过程
  - 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
- 子组件更新过程
  - 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 父组件更新的过程
  - 父 beforeUpdate -> 父 updated
- 销毁过程
  - 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 第一次页面加载会触发哪几个钩子？

第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这四个钩子

### 在哪个生命周期内调用异步请求？

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

### 在什么阶段才能访问操作 DOM？

mounted

### 父组件可以监听到子组件的生命周期吗？

- 可以，并且有两种方法实现。
- 第一种
  - 在子组件的生命周期函数里面`$emit` 事件出来，在父组件里面监听
- 第二种
  - 在父组件里面监听@hock 生命周期函数，比如@hook:beforeCreate="xxx"。生命周期函数都能使用该方法监听。

### 为什么组件的 data 是方法?

因为组件是不断复用的，同一个组件在不同的地方数据应该是相互独立的。组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果。

### 谈谈你对 keep-alive 的了解？

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

### v-model 的原理？

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 属性和 change 作为事件。
- 如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，我们可以在组件中使用 model 更改默认属性和事件 model:{prop:'xxx', event:'xxx'}

### Vue 组件间通信有哪几种方式？

    1. props $emit 适用 父子组件通信
    2. $parent / $children 适用 父子组件通信。$children是一个数组。
    3. provide / inject 适用于 隔代子组件通信。不论子组件有多深，只要调用了 inject 那么就可以注入provide 中的数据。vue 2.2.0 新增
    4. EventBus （$emit / $on） 适用于 父子、隔代、兄弟组件通信。通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件
    5. Vuex 适用于 父子、隔代、兄弟组件通信

### SSR 服务端渲染

    优点
      更好的SEO
      渲染更快
    缺点
      加大了服务器压力
      开发有限制，比如只有beforeCreate和created生命周期函数

### vue-router 路由模式有几种？

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

### 为什么在 Vue3.0 采用了 Proxy,抛弃了 Object.defineProperty？

- Object.defineProperty 是通过 递归 + 遍历 data 对象来实现对数据的监控的,如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。消耗大，性能不够好。
- Object.defineProperty 在某些情况下是劫持不到的。比如说通过下标方式修改数组数据或者给对象新增属性。我们需要使用另外的 set 方法才能完成该操作，非常不便捷。
- Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。利用 Proxy 和 Reflect 实现之后，不用在考虑数组的操作是否触发 setter，只要操作经过 proxy 代理层，各种操作都会被捕获到，达到页面响应式的要求。

### vue3.0 特性

- Performance 性能好

  - 编译模板的优化 编译时会生成 number（大于 0）值的 PatchFlag，用作标记。仅带有 PatchFlag 标记的节点会被真正追踪，且无论层级嵌套多深，它的动态节点都直接与 Block 根节点绑定，无需再去遍历静态节点
  - 事件监听缓存：cacheHandlers

- Tree shaking support 可以将框架无用模块“剪辑”，仅打包需要的

- Composition API

  - reactive 接收一个普通对象然后返回该普通对象的响应式代理。等同于 2.x 的 Vue.observable()
  - 接受一个参数值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性 .value。
  - computed
  - readonly
  - readonly 传入一个对象（响应式或普通）或 ref，返回一个原始对象的只读代理。一个只读的代理是“深层的”，对象内部任何嵌套的属性也都是只读的。
  - watchEffect 立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。
  - watch watch API 完全等效于 2.x this.\$watch

- fragment

- 源码采用 typescript 编写，更好的 typescript 支持。使用 typescript 做类型检查

- Custom Renderer API：自定义渲染器 API

- 数据劫持由 Object.defineProperty 改为 proxy

### vue 中 key 值的作用？

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快，源码如下：

```js
// 在updateChildren方法里面
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

```js
// key不能使用index和随机数，会影响diff算法的准确性
// 删除第一个
0 -> a    0->b    1->b
1 -> b    1->c    2->c
2 -> c

// 其实这里b和c完全是可以复用的，但是因为key变了 所以会触发响应式更新。随机数也是同样的道理。所以需要保证节点key唯一不变。
```

### vue 中 mixin 和 mixins 区别？

mixin 用于全局混入，会影响到每个组件实例。

mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并。只有生命周期函数和 watch 不会合并，并且 mixin 的生命周期函数和 watch 方法会先与组件运行。

### 你对 vue 项目进行过哪些优化

    代码层面的优化
      v-if 和 v-show 区分使用场景
      computed 和 watch 区分使用场景
      v-for 遍历必须为 item 添加唯一的key，且避免同时使用 v-if
      事件的销毁
      图片资源懒加载
      路由懒加载 () => import(xxx) 或者 (resolve) => require([xxx], resolve)
      第三方插件的按需引入
      重复功能模块抽离成组件
      提取公共代码，公共代码用mixin或extend
      使用css预处理器，css代码公共部分复用
      css尽量不用calc函数和!important
      图片根据实际情况选取jpg还是png图片
    webpack层面
      Webpack 对图片进行压缩
      减少 ES6 转为 ES5 的冗余代码
      提取公共代码
      模板预编译
      提取组件的 CSS
      优化 SourceMap
      构建结果输出分析
      Vue 项目的编译优化
    web技术层面
      开启gzip压缩
      开启浏览器缓存
      使用cdn，CDN可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且CDN具有更好的可用性，更低的网络延迟和丢包率
      使用 Chrome Performance 查找性能瓶颈。

### vue 图片问题

- 在 data 里面定义图片路径，然后在 img 里面通过:src 绑定图片地址，图片是显示不出来的。因为 webpack 在打包的时候回检测引用图片的地方，并把图片压缩成 base64 的形式放在引用的地方，如果我们通过后面的 vue 动态绑定，我们是拿不到图片的。如果需要在 data 里面通过:src 的方式使用图片，我们可以使用 import 或 require 先把图片引进来，然后在使用。

- assets 和 static 两个文件都是静态的，但是它们是有区别的，static 文件夹下面的文件都是不能被 webpack 处理的，你必须使用绝对路径来引用这些文件，取决于在 config.js 里面加入的 build.assetsPublicPath 和 build.assetsSubDirectory 这两个属性设置的。其他地方的文件或图片都会被 webpack 解析成模块依赖，这时候就可以用 url-loader 和 css-loader 去处理。如果在 js 中引用图片，因为 js 是动态的所以没有办法去处理，但是我可以使用 require 或 import 将图片当成模块加载进来，就会被 webpack 当成静态文件解析，这时候就可以被 url-loader 处理。

- url-loader 会将引入的图片编码，生成 dataURI。相当于把图片数据翻译成一串字符，再把这些字符打包到文件当中，最终只需要引入这个文件就可以访问这个图片。当然如果图片较大，编码会消耗性能，因此 url-loader 提供了一个 limit 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还会使用 file-loader 进行 copy，一般会放在 static 文件夹下面。

### 在 Vue 实例中编写生命周期 hook 或其他 option/propertie 时，为什么不使用箭头函数？

箭头函数自己没有定义 this 上下文，而是绑定到其父函数的上下文中。当你在 Vue 程序中使用箭头函数（=>）时，this 关键字病不会绑定到 Vue 实例，因此会引发错误。所以强烈建议改用标准函数声明。

### Vue3.x 响应式数据原理？

因为 Proxy 可以直接监听对象和数组的变化，并且有多达 13 种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

Proxy 只会代理对象的第一层，Vue3 是怎样处理这个问题的呢？

- 判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。

监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？

- key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。

### Proxy 与 Object.defineProperty 优劣对比

Proxy 的优势如下:

Proxy 可以直接监听对象而非属性；
Proxy 可以直接监听数组的变化；

Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；

Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；

Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

Object.defineProperty 的优势如下:

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

### Vue 事件绑定原理是什么？

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的`$on` 实现的。
