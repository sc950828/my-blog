### 1、全局概览

- 初始化及挂载

  - 在 new Vue() 之后。 Vue 会调用 `_init` 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。初始化之后调用 `$mount` 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行编译然后再挂载。

- 编译渲染过程

  - compile 编译可以分成 parse、optimize 与 generate 三个阶段，最终得到需要的 render function
    - parse 会用正则等方式解析 template 模板中的指令、class、style 等数据，形成 AST。(抽象语法树)
    - optimize 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，为后面更新视图 patch 做的优化。经过 optimize 这层的处理，每个节点会加上 static 属性，用来标记是否是静态的。后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。
    - generate 是将 AST 转化成 render function 字符串的过程。

- 响应式原理

  - vue.js 则是采用数据劫持结合发布-订阅模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。init 的时候会循环遍历 data 的所有对象所有属性，使用 Object.defineProperty()来自定义对象属性的 get set 方法，定义一个对象属性的时候会创建该属性的发布者(dep)，每个调用(get)该属性的时候，在 get 方法里把订阅者(watcher)push 到发布者里面。每个设置(set)该属性的时候，发布者循环订阅者，一个个通知修改。

- VDOM 虚拟 DOM
  - 由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。render function 会被转化成 VDOM。Virtual DOM 其实就是一个 JavaScript 对象,例如

```js
  {
    tag: 'div',                 /*说明这是一个div标签*/
    children: [                 /*存放该标签的子节点*/
      {
          tag: 'a',           /*说明这是一个a标签*/
          text: 'click me'    /*标签的内容*/
      }
    ]
  }
```

- 更新视图 patch
  - 当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们会将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改即可。
  - diff 算法
    - diff 算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有 O(n)
    - 只有当 key、 tag、 isComment（是否为注释节点）、 data 同时定义（或不定义），同时满足当标签类型为 input 的时候 type 相同的时候才会判断新老节点相同

### 2、vue.js 核心是

- 数据驱动
- 组件系统

### 3、什么是 MVC MVP MVVM？

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

### 4、什么是 Virtual DOM？ Virtual DOM 有啥优点？

- 虚拟 dom 是 dom 的对象模型，就是对象表示法。
- 过程
  - 当页面的状态发生改变，我们需要对页面的 DOM 的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。
  - 最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。
- 优点
  - 当需要操纵 dom 时，可以在虚拟 DOM 的 内存中执行计算和操作，而不是在真实 DOM 上进行操纵，性能好。
  - 这自然会更快，并且允许虚拟 DOM 算法计算出最优化的方式来更新实际 DOM 结构。
  - 虚拟 DOM 本质上是 JavaScript 对象所以是可以跨平台的。

### 5、前端路由原理？两种实现方式有什么区别？

- hash 模式和 history 模式
  - hash 模式是通过 hashchange 事件来监听 url 变化的。无需后端配置
  - history 模式是通过 html5 的新方法 history.pushState 和 history.replaceState 改变 URL。需要后端配置

### 6、为什么在 Vue3.0 采用了 Proxy,抛弃了 Object.defineProperty？

- Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue 2.x 里,是通过 递归 + 遍历 data 对象来实现对数据的监控的,如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。
- Object.defineProperty 在某些情况下是劫持不到的。比如说通过下标方式修改数组数据或者给对象新增属性。我们需要使用另外的 set 方法才能完成该操作，非常不便捷。
- Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。利用 Proxy 和 Reflect 实现之后，不用在考虑数组的操作是否触发 setter，只要操作经过 proxy 代理层，各种操作都会被捕获到，达到页面响应式的要求。

### 7、vue 是如何对数组方法进行变异的 ?

vue 除了使用遍历调用 Object.defineProperty 方法外还通过原型拦截的方式重写了数组的 7 个方法,Vue2.x 中并没有实现将已存在的数组元素做监听，而是去监听造成数组变化的方法，触发这个方法的同时去调用挂载好的响应页面方法，达到页面响应式的效果。

作者尤雨溪的考虑是因为性能原因，给每一个数组元素绑定上监听，实际消耗很大，而受益并不大。

### 8、vue 双向数据绑定原理？

vue 通过使用双向数据绑定，来实现了 View 和 Model 的同步更新。vue 的双向数据绑定主要是通过使用数据劫持和发布-订阅模式来实现的。

- 首先我们通过 Object.defineProperty() 方法来对 Model 数据各个属性添加访问器属性，以此来实现数据的劫持，因此当 Model 中的数据发生变化的时候，我们可以通过配置的 setter 和 getter 方法来实现对 View 层数据更新的通知。

- 数据在 html 模板中一共有两种绑定情况，一种是使用 v-model 来对 value 值进行绑定，一种是作为文本绑定，在对模板引擎进行解析的过程中。

- 如果遇到元素节点，并且属性值包含 v-model 的话，我们就从 Model 中去获取 v-model 所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新。

- 如果遇到了绑定的文本节点，我们使用 Model 中对应的属性的值来替换这个文本。对于文本节点的更新，我们使用了发布订阅者模式，属性作为一个主题，我们为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当 Model 层数据发生改变的时候，Model 作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。

### 9、如何比较两个 DOM 树的差异？

- 两个树的完全 diff 算法的时间复杂度为 O(n^3) ，但是在前端中，我们很少会跨层级的移动元素，所以我们只需要比较同一层级的元素进行比较，这样就可以将算法的时间复杂度降低为 O(n)。

- 算法首先会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个序号。在深度遍历的时候，每遍历到一个节点，我们就将这个节点和新的树中的节点进行比较，如果有差异，则将这个差异记录到一个对象中。

- 在对列表元素进行对比的时候，由于 TagName 是重复的，所以我们不能使用这个来对比。我们需要给每一个子节点加上一个 key，列表对比的时候使用 key 来进行比较，这样我们才能够复用老的 DOM 树上的节点。

### 10、computed 的实现原理

computed 本质是一个惰性求值的观察者。其内部通过 this.dirty 属性标记计算属性是否需要重新求值。当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher,computed watcher 通过 this.dep.subs.length 判断有没有订阅者,有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)没有的话,仅仅把 this.dirty = true。 (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)

### 11、vue 的模版编译过程是怎么样的？

compile 编译可以分成 parse、optimize 与 generate 三个阶段，最终得到需要的 render function。
首先会先将模版通过解析器(正则匹配)，解析成 AST（抽象语法树），然后再通过优化器，遍历 AST 树，将里面的所有静态节点找出来，并打上标志，这样可以避免 diff 算法对比时进行一些无用的对比。因为静态节点这辈子是什么样就是什么样的了，不会变化。接着，代码生成器会将这颗 AST 编译成代码字符串，这段字符串会被 Vdom 里面的 createElement 函数调用，最后生成 Vnode。

### 12、vm.$on，vm.$off,vm.$once,vm.$emit

```js
// 手写vm.$on
Vue.prototype.$on = function (event, fn) {
  const vm = this;

  if (Array.isArray(event)) {
    for (let e of events) {
      vm.$on(e, fn);
    }
  } else {
    (vm.events[event] || vm.events[event] = []).push(fn);
  }
};

// 手写$off
Vue.prototype.$off = function (event, fn) {
  const vm = this;

  if (!arguments.length) {
    vm._events = Object.create(null);

    return vm;
  }

  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      vm.$off(event[i], fn);
    }

    return vm;
  }

  const cbs = vm._events[event];

  if (!cbs) return vm;

  if (arguments.length === 1) {
    vm._events[event] = null;

    return vm;
  }

  if (fn) {
    let len = cbs.length;

    while (len--) {
      let cb = cbs[len];

      if (cb === fn || cb[len].fn === fn) {
        cbs.splice(len, 1);

        break;
      }
    }
  }

  return vm;
};

// 手写$once
Vue.prototype.$once = function (event, fn) {
  const vm = this;

  function on() {
    vm.$off(event, on);

    fn.apply(vm, arguments);
  }

  on.fn = fn;

  vm.$on(event, on);

  return vm;
};

//手写$emit
Vue.prototype.$emit = function (event, ...params) {
  const vm = this;

  let cbs = vm._events[event];

  if (cbs) {
    for (let i = 0; i < cbs.length; i++) {
      cbs[i].apply(vm, params);
    }
  }

  return vm;
};
```

### 13、`vm.$nextTick`

首先 nextTick 并不是浏览器本身提供的一个异步 API，而是 Vue 中，用过由浏览器本身提供的原生异步 API 封装而成的一个异步封装方法

它对于浏览器异步 API 的选用规则如下，Promise 存在取由 Promise.then，不存在 Promise 则取 MutationObserver，MutationObserver 不存在 setImmediate，setImmediate 不存在最后取 setTimeout 来实现。

从上面的取用规则也可以看出来，nextTick 即有可能是微任务，也有可能是宏任务，从优先去 Promise 和 MutationObserver 可以看出 nextTick 优先微任务，其次是 setImmediate 和 setTimeout 宏任务。

nextTick 主要是通过 js eventLoop 的执行机制原理，将回调通过（promise）添加到 microTask 上面，来实现,在下一次 DOM 周期后执行回调函数。

```js
const callback = []

let pendding = false

function flushCallbacks(){

 padding =false

 const copies = callback.slice(0)

 callback.length = 0

 for(let i = 0;i < copies.length;i++){

     copies[i]()

 }

}

lei microTimeFunc

const p = promise.resolve()

microTimeFunc = ()=>{

    p.then(flushCallbacks)

}

function nextTick(cb,ctx){

    if(cb){

        callback.push(()=>{
            cb.call(ctx)
        })

    }

    if(!pendding){

        pendding = true

        microTimeFunc()

    }

}
```

### 14、指令的执行原理

在模版阶段，会将节点上的指令解析处理并添加到 AST 的 directives 属性中。随后 directives 数据会传到 Vnode 中，接着就可以通过 vnode.data.directives 获取一个节点所绑定的指令。最后，当 VDom 进行修补时，会根据节点的对比结果触发一些钩子函数。更新指令的程序会监听 create,update,destory 钩子函数，并在这三个钩子函数触发时对 VNode 和 oldVNode 进行对比，最终根据对比触发指令的钩子函数。

### 15、Vue 中如何实现异步渲染？

在 Vue 中异步渲染实际在数据每次变化时，将其所要引起页面变化的部分都放到一个异步 API 的回调函数里，直到同步代码执行完之后，异步回调开始执行，最终将同步代码里所有的需要渲染变化的部分合并起来，最终执行一次渲染操作。

拿上面例子来说，当 val 第一次赋值时，页面会渲染出对应的文字，但是实际这个渲染变化会暂存，val 第二次赋值时，再次暂存将要引起的变化，这些变化操作会被丢到异步 API，Promise.then 的回调函数中，等到所有同步代码执行完后，then 函数的回调函数得到执行，然后将遍历存储着数据变化的全局数组，将所有数组里数据确定先后优先级，最终合并成一套需要展示到页面上的数据，执行页面渲染操作操作。

异步队列执行后，存储页面变化的全局数组得到遍历执行，执行的时候会进行一些筛查操作，将重复操作过的数据进行处理，实际就是先赋值的丢弃不渲染，最终按照优先级最终组合成一套数据渲染。这里触发渲染的异步 API 优先考虑 Promise，其次 MutationObserver，如果没有 MutationObserver 的话，会考虑 setImmediate，没有 setImmediate 的话最后考虑是 setTimeout。

### 16、Vue 能不能同步渲染？

当然是可以的。有两种方法

- 第一种全局 设置 Vue.config.async = false
- 第二种 在开发代码中，需要将本次 watcher 的 sync 属性修改为 true，对于 watcher 的 sync 属性变化只需要在需要同步渲染的数据变化操作前执行 `this._watcher.sync=true`，这时候则会同步执行页面渲染动作。

```js
// 页面会渲染出val为1，而不会渲染出2，最终渲染的结果是3，但是官网未推荐该用法，请慎用。
mounted () {
    this._watcher.sync = true
    this.val = 1
    debugger
    this._watcher.sync = false
    this.val = 2
    this.val = 3
  }
```

### 17、keep-alive 实现原理

- 获取 keep-alive 包裹着的第一个子组件对象及其组件名
- 根据设定的 include/exclude（如果有）进行条件匹配,决定是否缓存。不匹配,直接返回组件实例
- 根据组件 ID 和 tag 生成缓存 Key,并在缓存对象中查找是否已缓存过该组件实例。如果存在,直接取出缓存值并更新该 key 在 this.keys 中的位置(更新 key 的位置是实现 LRU 置换策略的关键，用到了就 push 到最后面。)
- 在 this.cache 对象中存储该组件实例并保存 key 值,之后检查缓存的实例数量是否超过 max 的设置值,超过则根据 LRU 置换策略删除最近最久未使用的实例（即是下标为 0 的那个 key）
- 最后组件实例的 keepAlive 属性设置为 true,这个在渲染和执行被包裹组件的钩子函数会用到。

### 18、scope 原理

其实就是加了给 data-xxx 属性，然后样式使用的时候都加上了该属性选择器。

```
// 原始代码
<template>
  <div class="demo">
    <span class="content">
      Vue.js scoped
    </span>
  </div>
</template>

<style lang="less" scoped>
  .demo{
    font-size: 16px;
    .content{
      color: red;
    }
  }
</style>

// 浏览器渲染效果
<div data-v-039c5b43 class="demo">
  <div data-v-fed36922 class="content">
    Vue.js scoped
  </div>
</div>
<style type="text/css">
.demo[data-v-039c5b43] {
  font-size: 14px;
}
.demo[data-v-039c5b43] .content[data-v-039c5b43] { //.demo 上并没有加 data 属性
  color: red;
}
</style>
```
