1. 全局概览
  初始化及挂载
    在 new Vue() 之后。 Vue 会调用 _init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed
    与 watch 等。初始化之后调用 $mount 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行编译然后再挂载。

  编译渲染过程
    compile编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function
    parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。(抽象语法树)
    optimize 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，为后面更新视图patch做的优化。
      经过 optimize 这层的处理，每个节点会加上 static 属性，用来标记是否是静态的。
      后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。
    generate 是将 AST 转化成 render function 字符串的过程
    然后通过执行 render 函数生成 Virtual DOM 最终映射为真实 DOM。

  响应式原理
    vue.js 则是采用数据劫持结合发布-订阅模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，
    触发相应的监听回调。
    init的时候会循环遍历data的所有对象所有属性，使用Object.defineProperty()来自定义对象属性的get set方法，定义一个对象属性的时候会创建该属性的发布者，(dep)
    每个调用(get)该属性的时候，在get方法里把订阅者(watcher)push到发布者里面。每个设置(set)该属性的时候，发布者循环订阅者，一个个通知修改。

  VDOM 虚拟DOM
    由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。
    render function 会被转化成 VDOM。Virtual DOM 其实就是一个 JavaScript 对象,例如
    {
        tag: 'div',                 /*说明这是一个div标签*/
        children: [                 /*存放该标签的子节点*/
            {
                tag: 'a',           /*说明这是一个a标签*/
                text: 'click me'    /*标签的内容*/
            }
        ]
    }

  更新视图 patch
    当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们会将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，
    经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改即可。
    diff算法
      diff 算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有 O(n)
      只有当 key、 tag、 isComment（是否为注释节点）、 data同时定义（或不定义），同时满足当标签类型为 input 的时候 type 相同的时候才会判断新老节点相同

2. vue.js核心是
  数据驱动
  组件系统

3. 什么是 MVC MVP MVVM？
  MVC
    传统的 MVC 架构是视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。
    MVC 有一个巨大的缺陷就是控制器承担的责任太大了，还有就是view层和model层有耦合。所有的通信都是单向的。
  MVP
    MVP只是将MVC中的Controller变成了Presenter
    与mvc不同的是mvp是双向通信，V—>P—>M，M—>P—>V view层跟model层没有耦合
    Presenter中除了业务逻辑以外，还有大量的View->Model，Model->View的手动同步逻辑，造成Presenter比较笨重，维护起来会比较困难。
  MVVM
    ViewModel 
      是由前端开发人员组织生成和维护的视图数据层，通过数据来驱动视图，开发者只需要操作数据，视图自动更新，没有dom操作。这就完全解耦了 View 层和 Model 层
    View 层
      View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。
    Model 层
      前端来说就是后端提供的 api 接口。

4. 什么是 Virtual DOM？为什么 Virtual DOM 优点？
  虚拟dom是dom的对象模型，就是对象表示法。
  当需要操纵dom时，可以在虚拟 DOM的 内存中执行计算和操作，而不是在真实 DOM 上进行操纵，性能好。
  这自然会更快，并且允许虚拟 DOM 算法计算出最优化的方式来更新实际 DOM 结构。
  虚拟 DOM 本质上是 JavaScript 对象所以是可以跨平台的。

5. 前端路由原理？两种实现方式有什么区别？
  hash模式和history模式
  hash模式是通过hashchange事件来监听url变化的。无需后端配置
  history模式是通过html5的新方法history.pushState 和 history.replaceState 改变 URL。需要后端配置

6. 为什么在 Vue3.0 采用了 Proxy,抛弃了 Object.defineProperty？
  Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue 2.x 里,是通过 递归 + 遍历 data 对象来实现对数据的监控的,如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。  
  Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。

7. vue 是如何对数组方法进行变异的 ? 
  Vue 通过原型拦截的方式重写了数组的 7 个方法




