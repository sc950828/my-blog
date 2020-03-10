### 1、全局概览

- 初始化及挂载

  - 在 new Vue() 之后。 Vue 会调用 \_init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。初始化之后调用 \$mount 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行编译然后再挂载。

- 编译渲染过程

  - compile 编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function
    - parse 会用正则等方式解析 template 模板中的指令、class、style 等数据，形成 AST。(抽象语法树)
    - optimize 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，为后面更新视图 patch 做的优化。
      经过 optimize 这层的处理，每个节点会加上 static 属性，用来标记是否是静态的。后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。
    - generate 是将 AST 转化成 render function 字符串的过程。
    - 最后通过执行 render 函数生成 Virtual DOM 最终映射为真实 DOM。

- 响应式原理

  - vue.js 则是采用数据劫持结合发布-订阅模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。init 的时候会循环遍历 data 的所有对象所有属性，使用 Object.defineProperty()来自定义对象属性的 get set 方法，定义一个对象属性的时候会创建该属性的发布者，(dep)
    每个调用(get)该属性的时候，在 get 方法里把订阅者(watcher)push 到发布者里面。每个设置(set)该属性的时候，发布者循环订阅者，一个个通知修改。

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

- MVC
  - MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。传统的 MVC 架构是视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新 model，当 model 层发生改变的时候它会自动通知视图进行更新。MVC 有一个巨大的缺陷就是控制器承担的责任太大了，还有就是 view 层和 model 层有耦合。controll 不能直接控制 view 层。
- MVP
  - MVP 只是将 MVC 中的 Controller 变成了 Presenter
  - 与 mvc 不同的是 mvp 是双向通信，V—>P—>M，M—>P—>V。这样 view 层跟 model 层就没有耦合，实现了解耦。
  - Presenter 中除了业务逻辑以外，还有大量的 View->Model，Model->View 的手动同步逻辑，造成 Presenter 比较笨重，维护起来会比较困难。
- MVVM
  - ViewModel 是由前端开发人员组织生成和维护的视图数据层，通过数据来驱动视图，开发者只需要操作数据，视图自动更新，没有 dom 操作。将 View 和 Model 的同步更新给自动化了。这就是简化了 MVP 模式中的 Presenter。
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
- Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。

### 7、vue 是如何对数组方法进行变异的 ?

Vue 通过原型拦截的方式重写了数组的 7 个方法

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
