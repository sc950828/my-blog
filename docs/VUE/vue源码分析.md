### 1、vue 类型检查

Vue.js 的源码利用了 flow 来做静态类型检查

为什么用 flow？

JavaScript 是动态类型语言，它的灵活性有目共睹，但是过于灵活的副作用就是很容易就写出非常隐蔽的隐患代码，在编译期甚至运行时看上去都不会报错，但是可能会发生各种各样奇怪的和难以解决的 bug。
项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性。Vue.js 在做 2.0 重构的时候，在 ES2015 的基础上，除了 ESLint 保证代码风格之外，也引入了 flow 做静态类型检查。

flow 常用的两种类型检查方式是：

- 类型推断：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。
- 类型注释：事先注释好我们期待的类型，flow 会基于这些注释来判断。

Flow 提出了一个 libdef 的概念，可以用来识别这些第三方库或者是自定义类型

### 2、源码目录分析

compiler(编译相关)

- compiler 目录包含 Vue.js 所有编译相关的代码。将 template 模板编译为 render 函数。在 Vue 中使用 render 函数来创建 VNode，而在开发的时候我们更多的是使用 template 来编写 HTML，所以需要将 template 编译为 render 函数。

- 编译工作可以在构建项目的时候借助 webpack、vue-loader 等插件来完成，也可以在项目运行时使用 Vue 的构建功能来完成。相对应的构建输出有 runtime 和 runtime-with-compiler 两个版本。由于编译是一项消耗性能的工作，因此推荐使用第一种方式。

- compiler 目录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。

- 编译的工作可以在构建时做（借助 webpack、vue-loader 等辅助插件）；也可以在运行时做，使用包含构建功能的 Vue.js。显然，编译是一项耗性能的工作，所以更推荐前者——离线编译。

core(核心代码)

```
├── core        # Vue 核心代码
  ├── components    # 全局通用组件 Keep-Alive
  ├── global-api    # 全局 api，即 Vue 对象上的方法，如 extend，mixin，use 等
  ├── instance      # Vue 实例化相关代码，如初始化，事件，渲染，生命周期等
  ├── observer      # 响应式数据修改代码
  ├── util          # 工具函数
  ├── vdom          # 虚拟 DOM 相关代码
```

platforms(不同平台的支持)

```
├── platforms   # 平台相关代码
  ├── web           # web 平台
    ├── compiler        # 编译时相关
    ├── runtime         # 运行时相关
    ├── server          # 服务端渲染相关
    ├── util            # 工具函数
  ├── weex          # 配合 weex 运行在 native 平台
```

server

Vue 从 2.0 起支持服务端渲染（SSR）。server 目录下存放的是与服务端渲染相关代码，这也就意味着这些代码是运行在服务端的 Node.js 代码，而不是运行在浏览器端。

sfc

sfc 下只有一个 parser.js，实际上就是一个解析器，用于将我们编写的 .vue 文件解析成一个 js 对象。

shared

shared 目录中定义了常量和工具函数，供其他文件引用。

### 3、源码构建

Rollup

- Vue.js 源码使用 Rollup 构建。Rollup 和 Webpack 都是打包工具，但两者的应用场景不同。Webpack 功能相比 Rollup 更加强大，它可以将各种静态资源（包括 css，js，图片等）通通打包成一个或多个 bundle，并按需加载；同时正因为 Webpack 功能强大，打包出来的文件体积也较大。因此 Webpack 更适用于应用的开发。
- 而 Rollup 相对于 Webpack 更加轻量，它只处理 js 文件而不处理其他静态资源文件，打包出来的文件体积也更小，因此 Rollup 更适用于像类库这种只有 js 代码的项目构建。所以大部分类库例如 Vue，React，Angular 等都采用 Rollup 来打包。

Runtime Only VS Runtime + Compiler

通常我们利用 vue-cli 去初始化我们的 Vue.js 项目的时候会询问我们用 Runtime Only 版本的还是 Runtime + Compiler 版本。下面我们来对比这两个版本。

Runtime Only
我们在使用 Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。

Runtime + Compiler
我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板。很显然，这个编译过程对性能会有一定损耗，所以通常我们更推荐使用 Runtime-Only 的 Vue.js

### 5、new Vue 发生了什么？

Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

在初始化的最后，检测到如果有 el 属性，则调用 `vm.$mount` 方法挂载 vm，挂载的目标就是把模板渲染成最终的 DOM

所以第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这四个钩子。

```js
initLifecycle(vm);
initEvents(vm);
initRender(vm);
callHook(vm, "beforeCreate");
initInjections(vm); // resolve injections before data/props
initState(vm); // 初始化 props、data、methods、watch、computed 等属性
initProvide(vm); // resolve provide after data/props
callHook(vm, "created");

if (vm.$options.el) {
  vm.$mount(vm.$options.el);
}
```

### 6、挂载

如果没有定义 render 方法，则会把 el 或者 template 字符串转换成 render 方法。这里我们要牢记，在 Vue 2.0 版本中，所有 Vue 的组件的渲染最终都需要 render 方法，无论我们是用单文件 .vue 方式开发组件，还是写了 el 或者 template 属性，最终都会转换成 render 方法，那么这个过程是 Vue 的一个“在线编译”的过程，它是调用 compileToFunctions 方法实现的。最后，调用原先原型上的 `$mount` 方法挂载。如果我们用的是 Runtime Only 版本则没有在线编译这一步，因为编译在我们打包的时候使用 webpack 的 vue-loader 就已经编译好了，已经编译成渲染函数了。

`$mount` 方法实际上会去调用 mountComponent 方法

mountComponent 核心就是先实例化一个渲染 Watcher，在它的回调函数中会调用 updateComponent 方法，在此方法中调用 `vm._render` 方法把渲染函数生成虚拟 Node，最终调用 `vm._update` 把虚拟 DOM 变成真实 DOM。

Watcher 在这里起到两个作用，一个是初始化的时候会执行回调函数，另一个是当 vm 实例中的监测的数据发生变化的时候执行回调函数。每个 Vue 组件都有一个对应的 Watcher。

函数最后判断为根节点的时候设置 `vm._isMounted` 为 true， 表示这个实例已经挂载了，同时执行 mounted 钩子函数。

```js
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== "production") {
      /* istanbul ignore if */
      if (
        (vm.$options.template && vm.$options.template.charAt(0) !== "#") ||
        vm.$options.el ||
        el
      ) {
        warn(
          "You are using the runtime-only build of Vue where the template " +
            "compiler is not available. Either pre-compile the templates into " +
            "render functions, or use the compiler-included build.",
          vm
        );
      } else {
        warn(
          "Failed to mount component: template or render function not defined.",
          vm
        );
      }
    }
  }
  callHook(vm, "beforeMount");

  let updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production" && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name;
      const id = vm._uid;
      const startTag = `vue-perf-start:${id}`;
      const endTag = `vue-perf-end:${id}`;

      mark(startTag);
      const vnode = vm._render();
      mark(endTag);
      measure(`vue ${name} render`, startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(`vue ${name} patch`, startTag, endTag);
    };
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          callHook(vm, "beforeUpdate");
        }
      }
    },
    true /* isRenderWatcher */
  );
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, "mounted");
  }
  return vm;
}
```

### 7、渲染 render

`vm._render` 最终是通过执行 createElement 方法并返回的是 vnode，它是一个虚拟 Node。Vue 2.0 相比 Vue 1.0 最大的升级就是利用了 Virtual DOM。

其中有一段逻辑是对参数 tag 的判断，如果是一个普通的 html 标签，则会实例化一个普通 VNode 节点，否则通过 createComponent 方法创建一个组件 VNode。

```js
if (typeof tag === "string") {
  let Ctor;
  ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
  if (config.isReservedTag(tag)) {
    // platform built-in elements
    vnode = new VNode(
      config.parsePlatformTagName(tag),
      data,
      children,
      undefined,
      undefined,
      context
    );
  } else if (
    isDef((Ctor = resolveAsset(context.$options, "components", tag)))
  ) {
    // component
    vnode = createComponent(Ctor, data, context, children, tag);
  } else {
    // unknown or unlisted namespaced elements
    // check at runtime because it may get assigned a namespace when its
    // parent normalizes children
    vnode = new VNode(tag, data, children, undefined, undefined, context);
  }
} else {
  // direct component options / constructor
  vnode = createComponent(tag, data, context, children);
}
```

### 8、虚拟 DOM

VNode 是对真实 DOM 的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其它属性都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是非常轻量和简单的。性能好可以跨平台。

Vue.js 利用 createElement 方法创建 VNode

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。

```js
// 虚拟DOM类
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string; // functional scope id support

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child(): Component | void {
    return this.componentInstance;
  }
}
```

### 9、update

主要是 patch 方法。

实际上是遍历子虚拟节点，递归调用 createElm，调用原生 api 创建真实 DOM。

```js
// patch
// new VNode 不存在就删;
// old VNode 不存在就增;
// 都存在就 比较类型，类型不同直接替换(删老增新)、类型相同执行更新 pathVnode()，也就是进入 diff 算法
return function patch(
  oldVnode,
  vnode,
  hydrating,
  removeOnly,
  parentElm,
  refElm
) {
  //用到的参数，oldVnode：旧的vnode、vnode：新的vnode、hydrating：服务端渲染、removeOnly：避免误操作
  //当新的vnode不存在，并且旧的vnode存在时，则移除老节点。
  if (isUndef(vnode)) {
    if (isDef(oldVnode)) {
      invokeDestroyHook(oldVnode);
    }
    return;
  }
  var insertedVnodeQueue = [];

  //如果旧的vnode不存在
  if (isUndef(oldVnode)) {
    //就创建一个新的节点
    createElm(vnode, insertedVnodeQueue, parentElm, refElm);
  } else {
    //获取旧vnode的节点类型
    var isRealElement = isDef(oldVnode.nodeType);
    // 如果不是真实的dom节点并且属性相同
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // 对oldVnode和vnode进行diff，并对oldVnode打patch
      patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
    }
    // 如果不相等就删除老节点，增加新节点。
  }
  //最后返回新vnode的节点内容
  return vnode.elm;
};

// sameVnode
// sameVnode 其实很简单，只有当 key、 tag、 isComment（是否为注释节点）、 data同时定义（或不定义），
// 同时满足当标签类型为 input 的时候 type 相同（某些浏览器不支持动态修改<input>类型，所以他们被视为不同类型）即可
function sameVnode() {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    !!a.data === !!b.data &&
    sameInputType(a, b)
  );
}

function sameInputType(a, b) {
  if (a.tag !== "input") return true;
  let i;
  const typeA = (i = a.data) && (i = i.attrs) && i.type;
  const typeB = (i = b.data) && (i = i.attrs) && i.type;
  return typeA === typeB;
}
```

diff 算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有 O(n)，是一种相当高效的算法

```js
// diff使用patchVnode方法
// 包括三种类型操作:属性更新PROPS、文本更新TEXT、子节点更新REORDER
// 1.如果新旧VNode都是静态的，那么只需要替换elm以及componentInstance即可。
// 2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren
// 3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。
// 4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。
// 5.当新老节点都无子节点的时候，只是文本的替换。

function patchVnode(oldVnode, vnode) {
  // 首先在新老 VNode 节点相同的情况下，就不需要做任何改变了
  if (oldVnode === vnode) {
    return;
  }

  // 在当新老 VNode 节点都是 isStatic（静态的），并且 key 相同时，只要将 componentInstance 与 elm 从老 VNode 节点“拿过来”即可。
  if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm;
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }

  const elm = (vnode.elm = oldVnode.elm);
  const oldCh = oldVnode.children;
  const ch = vnode.children;

  // 当新 VNode 节点是文本节点的时候，直接用 setTextContent 来设置 text
  if (vnode.text) {
    nodeOps.setTextContent(elm, vnode.text);
  } else {
    // oldCh 与 ch 都存在且不相同时，使用 updateChildren 函数来更新子节点
    if (oldCh && ch && oldCh !== ch) {
      updateChildren(elm, oldCh, ch);
      // 如果只有 ch 存在的时候，将 ch 批量插入插入到节点elm下。如果老节点是文本节点则先将节点的文本清除。
    } else if (ch) {
      if (oldVnode.text) nodeOps.setTextContent(elm, "");
      addVnodes(elm, null, ch, 0, ch.length - 1);
      // 同理当只有 oldch 存在时，说明需要将老节点通过 removeVnodes 全部清除。
    } else if (oldCh) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      // 最后一种情况是当只有老节点是文本节点的时候，清除其节点文本内容。
    } else if (oldVnode.text) {
      nodeOps.setTextContent(elm, "");
    }
  }
}

// updateChildren
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx, idxInOld, elmToMove, refElm;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先当 oldStartVnode 或者 oldEndVnode 不存在的时候，oldStartIdx 与 oldEndIdx 继续向中间靠拢，
    // 并更新对应的 oldStartVnode 与 oldEndVnode 的指向
    if (!oldStartVnode) {
      // 下移
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      // 上移
      oldEndVnode = oldCh[--oldEndIdx];
      // 首先是 oldStartVnode 与 newStartVnode
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
      // 其次是 oldEndVnode 与 newEndVnode
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
      // oldStartVnode 与 newEndVnode 如果相同
      // 将 oldStartVnode.elm 这个节点直接移动到 oldEndVnode.elm 这个节点的后面即可
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      nodeOps.insertBefore(
        parentElm,
        oldStartVnode.elm,
        nodeOps.nextSibling(oldEndVnode.elm)
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
      // 同理，oldEndVnode 与 newStartVnode
      // 将 oldEndVnode.elm 插入到 oldStartVnode.elm 前面
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 最后是当以上情况都不符合的时候
      let elmToMove = oldCh[idxInOld];
      if (!oldKeyToIdx)
        // createKeyToOldIdx 的作用是产生 key 与 index 索引对应的一个 map 表
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;
      if (!idxInOld) {
        // 如果没有找到相同的节点，则通过 createElm 创建一个新节点，并将 newStartIdx 向后移动一位。
        createElm(newStartVnode, parentElm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        // 如果找到了节点，同时它符合 sameVnode，则将这两个节点进行 patchVnode
        // 将该位置的老节点赋值 undefined
        // 同时将 newStartVnode.elm 插入到 oldStartVnode.elm 的前面
        if (sameVnode(elmToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          // 如果不符合 sameVnode，只能创建一个新节点插入到 parentElm 的子节点中
          createElm(newStartVnode, parentElm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }

  // 当 while 循环结束以后，如果 oldStartIdx > oldEndIdx，说明老节点比对完了，但是新节点还有多的，
  // 需要将新节点插入到真实 DOM 中去，调用 addVnodes 将这些节点插入即可。
  if (oldStartIdx > oldEndIdx) {
    refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
    // 如果满足 newStartIdx > newEndIdx 条件，说明新节点比对完了，老节点还有多，
    // 将这些无用的老节点通过 removeVnodes 批量删除即可。
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}
```

### 10、响应式系统

核心就是利用 Object.defineProperty 给数据添加了 getter 和 setter，目的就是为了在我们访问数据以及写数据的时候能自动执行一些逻辑：getter 做的事情是依赖收集，setter 做的事情是派发更新。

vue 对对象使用遍历加递归的方式调用 Object.defineProperty。vue 对数组除了使用遍历递归调用 Object.defineProperty 方法外还通过原型拦截的方式重写了数组的 7 个方法。

- 视图变化->数据变化采用的事件监听，比如 input 事件
- 数据快化->视图变化 就是 vue.js 则是采用数据劫持结合发布-订阅模式的方式。

所以在 `vm._render()` 过程中，会触发所有数据的 getter

```js
// Observer
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

// Dep
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
const targetStack = [];

export function pushTarget(_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = _target;
}

export function popTarget() {
  Dep.target = targetStack.pop();
}

// Watcher
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  computed: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  dep: Dep;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.computed = !!options.computed;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.computed = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid; // uid for batching
    this.active = true;
    this.dirty = this.computed; // for computed watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression =
      process.env.NODE_ENV !== "production" ? expOrFn.toString() : "";
    // parse expression for getter
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = function () {};
        process.env.NODE_ENV !== "production" &&
          warn(
            `Failed watching path: "${expOrFn}" ` +
              "Watcher only accepts simple dot-delimited paths. " +
              "For full control, use a function instead.",
            vm
          );
      }
    }
    if (this.computed) {
      this.value = undefined;
      this.dep = new Dep();
    } else {
      this.value = this.get();
    }
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get() {
    pushTarget(this);
    let value;
    const vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`);
      } else {
        throw e;
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  }

  /**
   * Add a dependency to this directive.
   */
  // 会通过id去重
  addDep(dep: Dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }
  // ...
}
```

### 11、Vue 怎么用 `vm.$set() vm.$delete()` 解决对象新增/删除属性不能响应的问题?

- `vm.$set()`

  - 如果是是数组的话,先判断 key 是不是合法的下标,如果这两个条件都通过然后调用 splice 去修改数组。(如果是新增的话那就将 target.length 和传进来的 key 取一个最大值赋值给 target.length)
  - 如果是对象
  - 判断该属性是否已经在对象上，如果在直接赋值
  - 如果 target 是 vue 实例,或者 target 是 `this.$data`,那么直接 return
  - 判断对象是否是响应式，不是响应式直接赋值
  - 如果对象是响应式并且该属性在对象上没有则使用封装的 defineReactive() 方法进行响应式处理，然后去通知 watcher

- `vm.$delete()`

  - 1.target 如果是数组的话并且 key 是合法的,那就通过 splice 去改变数组
  - 2.target 如果是 vue 实例.或者是 `this.$data`,那就直接 return
  - 3.target 如果不是双向绑定数据,那就直接 delete 就行不需要,通知 watcher
  - 4.以上条件都不满足,那么 target 就是双向绑定数据,delete 之后通知 watcher

### 12、computed 的实现原理

computed 本质是一个惰性 computed watcher。其内部通过 this.dirty 属性标记计算属性是否需要重新求值。当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher,computed watcher 通过 this.dep.subs.length 判断有没有订阅者,有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)没有的话,仅仅把 this.dirty = true。 (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)

computed 的依赖收集是借助 vue 的 watcher 来实现的，我们称之为 computed watcher，每一个计算属性会对应一个 computed watcher 对象，该 watcher 对象包含了 getter 属性和 get 方法，getter 属性就是计算属性对应的函数，get 方法是用来更新计算属性（通过调用 getter 属性），并会把该 computed watcher 添加到计算属性依赖的所有 data 属性的订阅器列表中，这样当任何计算属性依赖的 data 属性改变的时候，就会调用该 computed watcher 的 update 方法，把该 watcher 标记为 dirty，然后更新 dom 的 dom watcher 更新 dom 时，会触发 dirty 的 computed watcher 调用 evaluate 去计算最新的值，以便更新 dom。
所以 computed 的实现是需要两个 watcher 来实现的，一个用来收集依赖，一个用来更新 dom，并且两种 watcher 是有关联的。后续我们把更新 DOM 的 watcher 称为 domWatcher，另一种叫 computedWatcher。

```js
// initComputed
// 为每个计算属性生成一个computedWathcer，后续计算属性依赖的data属性会把这个computedWatcher添加到自己订阅器列表中，以此来实现依赖收集。
// 挟持每个计算属性的get和set方法，set方法没有意义，主要是get方法，后面会提到。
for (var key in computed) {
  var userDef = computed[key];
  // 每个计算属性对应的函数或者其get方法（computed属性可以设置get方法）
  var getter = typeof userDef === "function" ? userDef : userDef.get;
  // ....
  if (!isSSR) {
    // 为每个计算属性生成一个Wathcer
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      computedWatcherOptions
    );
  }
}
```

### 13、watch 的实现原理

所以本质上侦听属性也是基于 Watcher 实现的，它是一个 user watcher。跟 user watcher 配合的是 deep watcher 和 sync watcher 。deep watcher 是深度检测，sync watcher 是立即执行。

### 14、`vm.$nextTick`

首先 nextTick 并不是浏览器本身提供的一个异步 API，而是 Vue 中，用过由浏览器本身提供的原生异步 API 封装而成的一个异步封装方法

它对于浏览器异步 API 的选用规则如下，Promise 存在取由 Promise.then，不存在 Promise 则取 MutationObserver，MutationObserver 不存在 setImmediate，setImmediate 不存在最后取 setTimeout 来实现。

从上面的取用规则也可以看出来，nextTick 即有可能是微任务，也有可能是宏任务，先取 Promise 和 MutationObserver 可以看出 nextTick 优先微任务，其次是 setImmediate 和 setTimeout 宏任务。

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

### 15、编译

compile 编译可以分成 parse、optimize 与 generate 三个阶段，最终得到需要的 render function。
首先会先将模版通过解析器(正则匹配)，解析成 AST（抽象语法树），然后再通过优化器，遍历 AST 树，将里面的所有静态节点找出来，并打上标志，这样可以避免 diff 算法对比时进行一些无用的对比。因为静态节点这辈子是什么样就是什么样的了，不会变化。接着，代码生成器会将这颗 AST 编译成代码字符串，这段字符串会被 Vdom 里面的 createElement 函数调用，最后生成 Vnode。

```js
// 第一步 parse 会用正则等方式将 template 模板中进行字符串解析，得到指令、class、style等数据，形成 AST
// 抽象语法树如下
{
  /* 标签属性的map，记录了标签上属性 */
  'attrsMap': {
      ':class': 'c',
      'class': 'demo',
      'v-if': 'isShow'
  },
  /* 解析得到的:class */
  'classBinding': 'c',
  /* 标签属性v-if */
  'if': 'isShow',
  /* v-if的条件 */
  'ifConditions': [
      {
          'exp': 'isShow'
      }
  ],
  /* 标签属性class */
  'staticClass': 'demo',
  /* 标签的tag */
  'tag': 'div',
  /* 子标签数组 */
  'children': [
      {
          'attrsMap': {
              'v-for': "item in sz"
          },
          /* for循环的参数 */
          'alias': "item",
          /* for循环的对象 */
          'for': 'sz',
          /* for循环是否已经被处理的标记位 */
          'forProcessed': true,
          'tag': 'span',
          'children': [
              {
                  /* 表达式，_s是一个转字符串的函数 */
                  'expression': '_s(item)',
                  'text': '{{item}}'
              }
          ]
      }
  ]
}

// 第二步 优化 optimize
// optimize 这层的处理，每个节点会加上 static 属性，用来标记是否是静态的。
// 为静态的节点做上一些「标记」，在 patch 的时候我们就可以直接跳过这些被标记的节点的比对，从而达到「优化」的目的。

// 如果是表达式，就是非静态；如果是纯文本，就是静态；
// 对于一个普通元素，如果有 pre 属性，那么它使用了 v-pre 指令，是静态，
// 否则要同时满足以下条件：没有使用 v-if、v-for，没有使用其它指令（不包括 v-once），非内置组件，
// 是平台保留的标签，非带有 v-for 的 template 标签的直接子节点，节点的所有属性的 key 都满足静态 key；
// 这些都满足则这个 AST 节点是一个静态节点。

// 第三步 generate
// 将整个 AST 传入后判断是否为空，为空则返回一个 div 标签，否则通过 generate 来处理。
// 这样就转换成render function，这个代码就是运行时的代码
```

### 16、vm.$on，vm.$off,vm.$once,vm.$emit

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

### 17、css scope 原理

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

样式穿透我们使用 /deep/或者>>>都可以。还有就是我们可以使用不带scoped的style标签，使用父元素类名唯一。
.parent {
  >>> .three {
    xxx
  }
}
```

### 18、keep-alive 实现原理

- 获取 keep-alive 包裹着的第一个子组件对象及其组件名
- 根据设定的 include/exclude（如果有）进行条件匹配,决定是否缓存。不匹配,直接返回组件实例
- 根据组件 ID 和 tag 生成缓存 Key,并在缓存对象中查找是否已缓存过该组件实例。如果存在,直接取出缓存值并更新该 key 在 this.keys 中的位置(更新 key 的位置是实现 LRU 置换策略的关键，用到了就 push 到最后面。)
- 在 this.cache 对象中存储该组件实例并保存 key 值,之后检查缓存的实例数量是否超过 max 的设置值,超过则根据 LRU 置换策略删除最近最久未使用的实例（即是下标为 0 的那个 key）
- 最后组件实例的 keepAlive 属性设置为 true,这个在渲染和执行被包裹组件的钩子函数会用到。

### 19、指令的执行原理

在模版阶段，会将节点上的指令解析处理并添加到 AST 的 directives 属性中。随后 directives 数据会传到 Vnode 中，接着就可以通过 vnode.data.directives 获取一个节点所绑定的指令。最后，当 VDom 进行修补时，会根据节点的对比结果触发一些钩子函数。更新指令的程序会监听 create,update,destory 钩子函数，并在这三个钩子函数触发时对 VNode 和 oldVNode 进行对比，最终根据对比触发指令的钩子函数。

### 20、Vue 中如何实现异步渲染？

在 Vue 中异步渲染实际在数据每次变化时，将其所要引起页面变化的部分都放到一个异步 API 的回调函数里，直到同步代码执行完之后，异步回调开始执行，最终将同步代码里所有的需要渲染变化的部分合并起来，最终执行一次渲染操作。

拿上面例子来说，当 val 第一次赋值时，页面会渲染出对应的文字，但是实际这个渲染变化会暂存，val 第二次赋值时，再次暂存将要引起的变化，这些变化操作会被丢到异步 API，Promise.then 的回调函数中，等到所有同步代码执行完后，then 函数的回调函数得到执行，然后将遍历存储着数据变化的全局数组，将所有数组里数据确定先后优先级，最终合并成一套需要展示到页面上的数据，执行页面渲染操作操作。

异步队列执行后，存储页面变化的全局数组得到遍历执行，执行的时候会进行一些筛查操作，将重复操作过的数据进行处理，实际就是先赋值的丢弃不渲染，最终按照优先级最终组合成一套数据渲染。这里触发渲染的异步 API 优先考虑 Promise，其次 MutationObserver，如果没有 MutationObserver 的话，会考虑 setImmediate，没有 setImmediate 的话最后考虑是 setTimeout。

### 21、Vue 能不能同步渲染？

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

### 22、插件原理

我们知道安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。该方法需要在调用 new Vue() 之前被调用。当 install 方法被同一个插件多次调用，插件将只会被安装一次。

### 23、能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

通过 Vue.mixin()方法，全局注册一个混合，影响注册之后所有创建的每个 Vue 实例，该混合在 beforeCreate 钩子中通过 Vue.util.defineReactive()定义了响应式的\_route 属性。所谓响应式属性，即当\_route 值改变时，会自动调用 Vue 实例的 render()方法，更新视图。

- 1. hash 模式的实现原理
  - URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
  - hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 hash 的切换；
  - 可以通过  a  标签，并设置  href  属性，当用户点击这个标签后，URL  的 hash 值会发生改变；或者使用 JavaScript 来对  loaction.hash  进行赋值，改变 URL 的 hash 值；然后触发渲染。
  - 主动的我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。
- 2. history 模式的实现原理
  - history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录，但是不会被 popstate 事件监听。
  - 主动的我们可以通过 pushState 和 repalceState 两个 API 来操作实现 URL 的变化，然后手动触发页面跳转（渲染）。
  - 被动的我们可以通过 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）
  - 该模式需要后端配置。

调用 history.pushState()相比于直接修改 hash 主要有以下优势：

- pushState 设置的新 url 可以是与当前 url 同源的任意 url,而 hash 只可修改#后面的部分，故只可设置与当前同文档的 url
- pushState 设置的新 url 可以与当前 url 一模一样，这样也会把记录添加到栈中，而 hash 设置的新值必须与原来不一样才会触发记录添加到栈中
- pushState 通过 stateObject 可以添加任意类型的数据记录中，而 hash 只可添加短字符串
- pushState 可额外设置 title 属性供后续使用

'abstract'模式，不涉及和浏览器地址的相关记录，流程跟'HashHistory'是一样的，其原理是通过数组模拟浏览器历史记录栈的功能

### 24、vuex 原理

核心原理。在 Vuex 的 install 方法中，可以获取到 Vue 实例。我们在每个 Vue 实例上添加 `$store` 属性，可以让每个 vue 实例访问到 Vuex 数据信息；我们在每个 Vue 实例的  data 属性上添加上 state，这样 state 就是响应式的；收集我们传入 new Vuex.Store(options) 即 options 中所有的 mutaions、actions、getters；接着当我们 dispatch 的时候去匹配到 Store 类中存放的 actions 方法，然后去执行；当我们 commit 的时候去匹配到 Store 类中存放的 mutations 方法，然后去执行；这其实就是一个发布订阅模式，先存起来，后边用到再取再执行。

```js
// 我们采用 Vue.mixin 方法将 vuexInit 方法混淆进 beforeCreate 钩子中，并用 Vue 保存 Vue 对象
// 迷mixin中的生命周期函数与组件共存并且先于组件执行
export default install (_Vue) {
    Vue.mixin({ beforeCreate: vuexInit });
    Vue = _Vue;
}

// 因为之前已经用Vue.mixin 方法将 vuexInit 方法混淆进 beforeCreate 钩子中，
// 所以每一个 vm 实例都会调用 vuexInit 方法。
// 如果是根节点（$options中存在 store 说明是根节点），则直接将 options.store 赋值给 this.$store。
// 否则则说明不是根节点，从父节点的 $store 中获取。
// 通过这步的操作，我们已经可以在任意一个 vm 中通过 this.$store 来访问 Store 的实例啦～
function vuexInit () {
    const options = this.$options;
    if (options.store) {
      // 根结点赋值
        this.$store = options.store;
    } else {
      // 每个实例都会有父亲。故一层层给实例赋值
        this.$store = options.parent.$store;
    }
}

// 响应式核心就是新建一个Vue实例，将state挂载到实例 data 上，让 Vue 内部运用 Object.defineProperty 实现响应式。
function resetStoreVM (store, state, hot) {
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}

// getter是借助vue的计算属性computed特性实现的
var wrappedGetters = store._wrappedGetters;
//拿到存储的所有getters
var computed = {};
//遍历getters
forEachValue(wrappedGetters, function (fn, key) {
    //存储到computed对象中
    computed[key] = partial(fn, store);//partical的作用是将其变成()=>{fn(store)}
    //设置getters的代理，访问getters就是访问computed
    Object.defineProperty(store.getters, key, {
        get: function () { return store._vm[key]; },
        enumerable: true
    });
});

// 当严格模式下当state被修改的时候，store._committing 必须为 true，否则在开发阶段会报警告。
// store._committing 默认值是 false，只有在_withCommit()方法里面才会是true。这个方法只有commit才会调用。
// 所以外部任何非通过 Vuex 提供的接口直接操作修改 state 的行为都会在开发阶段触发警告。
```
