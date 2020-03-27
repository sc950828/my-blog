### 1、vue 类型检查

Vue.js 的源码利用了 flow 来做静态类型检查

为什么用 flow？

JavaScript 是动态类型语言，它的灵活性有目共睹，但是过于灵活的副作用就是很容易就写出非常隐蔽的隐患代码，在编译期甚至运行时看上去都不会报错，但是可能会发生各种各样奇怪的和难以解决的 bug。
项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性。Vue.js 在做 2.0 重构的时候，在 ES2015 的基础上，除了 ESLint 保证代码风格之外，也引入了 flow 做静态类型检查。

flow 常用的两种类型检查方式是：

- 类型推断：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。
- 类型注释：事先注释好我们期待的类型，flow 会基于这些注释来判断。

### 2、源码目录分析

compiler(编译相关)

- compiler 目录包含 Vue.js 所有编译相关的代码。将 template 模板编译为 render 函数。在 Vue 中使用 render 函数来创建 VNode，而在开发的时候我们更多的是使用 template 来编写 HTML，所以需要将 template 编译为 render 函数。
- 编译工作可以在构建项目的时候借助 webpack、vue-loader 等插件来完成，也可以在项目运行时使用 Vue 的构建功能来完成。相对应的构建输出有 runtime 和 runtime-with-compiler 两个版本。由于编译是一项消耗性能的工作，因此推荐使用第一种方式。

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

### 4、响应式系统

```js
// 核心 Object.defineProperty(obj, prop, descriptor)

function observer(data) {
  if (!value || typeof value !== "object") {
    return;
  }

  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(obj, key, value) {
  if (typeof value === "obj") {
    observer(value);
  }
  //一个属性一个订阅者
  const dep = new Dep();

  Object.definProperty(obj, key, {
    enumerable: true /* 属性可枚举 */,
    configurable: true /* 属性可被修改或删除 */,
    get() {
      // 这里会收集依赖
      /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
      dep.addSub(Dep.target);
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      // 通知依赖
      dep.notify();
    }
  });
}

// 模拟视图更新
function cb(val) {
  /* 渲染视图 */
  console.log("视图更新啦～");
}

// Vue构造函数
class Vue {
  /* Vue构造类 */
  constructor(options) {
    // 给data响应式
    this._data = options.data;
    observer(this._data);
    /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
    new Watcher();
    /* 在这里模拟render的过程，为了触发test属性的get函数 */
    console.log("render~", this._data.test);
  }
}

// 创建vue实例
let o = new Vue({
  data: {
    test: "I am test."
  }
});

// 更新数据 触发set方法 触发视图更新
o._data.test = "hello,world."; /* 视图更新啦～ */
```

### 5、发布订阅

```js
// 用 addSub 方法可以在目前的 Dep 对象中增加一个 Watcher 的订阅操作；
// 用 notify 方法通知目前 Dep 对象的 subs 中的所有 Watcher 对象触发更新操作。
// 订阅者 Dep
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.sub.push(sub);
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

// 观察者 Watcher 相当于中间层
class Watcher {
  constructor() {
    Dep.target = this;
  }

  update() {
    // 通知视图更新
    console.log("视图更新啦");
  }
}

Dep.target = null;
```

### 6、编译

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

// 第三步 generate
// 将整个 AST 传入后判断是否为空，为空则返回一个 div 标签，否则通过 generate 来处理。
// 这样就转换成render function
```

### 7、diff 过程

diff 算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有 O(n)，是一种相当高效的算法

```js
// 入参是新老两个 VNode 以及父节点的 element
function patch(oldVnode, vnode, parentElm) {
  // 没有老节点直接添加新节点
  if (!oldVnode) {
    addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
    // 没有新节点 移除老节点
  } else if (!vnode) {
    removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
  } else {
    // 判断是否是相同节点 是相同层节点进行patch
    if (sameVnode(oldVNode, vnode)) {
      patchVnode(oldVNode, vnode);
    } else {
      // 否则删除老节点 新增新节点
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
    }
  }
}

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
