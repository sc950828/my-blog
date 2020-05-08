### 1、react 介绍和创建 react 应用

如果你熟悉 MVC 概念的话，那么 React 的组件就相当于 MVC 里面的 View。

React.js 不是一个框架，它只是一个库。它只提供 UI （view）层面的解决方案。在实际的项目当中，它并不能解决我们所有的问题，需要结合其它的库，例如 Redux、React-router 等来协助提供完整的解决方法。

创建项目

    全局安装 create-react-app npm i create-react-app -g
    创建项目 create-react-app projectName
    运行项目 cd projectName npm start

    还可以单独使用 npm 安装
    npm init react-app projectName

    还可以单独使用 yarn 安装
    yarn create react-app projectName

### 2、 jsx

JSX，是一个 JavaScript 的语法扩展。让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。

React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

jsx 经过 babel 编译和 react.js 构造会生成 React.createElement(js 对象结构)，然后经过 ReactDOM.render()渲染成真实的 DOM 元素

为什么不直接从 JSX 直接渲染构造 DOM 结构，而是要经过中间这么一层呢？

第一个原因是，当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上。所以这也是为什么会要把 react-dom 单独抽离出来的原因，可以想象有一个叫 react-canvas 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 react-app 可以帮我们把它转换成原生的 App（实际上这玩意叫 ReactNative）。可以跨平台。

第二个原因是，有了这样一个对象。当数据变化，需要更新组件的时候，就可以用比较快的算法操作这个 JavaScript 对象，而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能。这个在以后的章节中我们会提到。性能好。

### 3、渲染

    const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));

### 4、组件

组件分为函数组件与 class 组件。函数组件就是无状态组件(没有 state，只有 props)，class 组件就是有状态组件。

自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头。

组件包裹的元素在子组件中通过 this.props.children 获取。this.props.children 是一个数组。

### 5、 props

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

React 是单向数据流，数据通过 props 从父节点传递到子节点。如果顶层的某个 props 改变了， React 会重新渲染所有的子节点。注意：props 是只读的（即不可以使用 this.props 直接修改 props），它是用于在整个组件树中传递数据和配置。

```js
// 我们使用defaultProps设置默认的props
static defaultProps = {
  likedText: '取消',
  unlikedText: '点赞'
}
```

### 6、state

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。除了拥有并设置了它的组件，其他组件都无法访问。

每个组件都有属于自己的 state，state 和 props 的区别在于 state 只存在于组件内部。注意 ：只能从当前组件调用 this.setState 方法修改 state 值（不可以直接修改 this.state）。

不要直接修改 State, 例如，此代码不会重新渲染组件。而是应该使用 setState()

```js
// error
this.state.comment = "Hello";
// right
this.setState({
  comment: "Hello"
});
```

构造函数是唯一可以给 this.state 赋值的地方。

```js
constructor(props) {
  console.log("NameClass props: ", props);
  // Class 组件应该始终使用 props 参数来调用父类的构造函数。
  super(props);
  this.state = { date: new Date() };
}
```

State 的更新可能是异步的。出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。

```js
// 可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，
// 将此次更新被应用时的 props 做为第二个参数
this.setState(function (state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

State 的更新会被合并

```js
// 其实就是没有set的默认使用原始值，只需要set需要更新的值。
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
// 这里的合并是浅合并，所以 this.setState({comments}) 完整保留了 this.state.posts，
//  但是完全替换了 this.state.comments。
```

数据是向下流动的

### 7、state vs props

state 的主要作用是用于组件保存、控制、修改自己的可变状态。state 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 state 是一个局部的、只能被组件自身控制的数据源。state 中状态可以通过 this.setState 方法进行更新，setState 会导致组件的重新渲染。

props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props，否则组件的 props 永远保持不变。

state 和 props 有着千丝万缕的关系。它们都可以决定组件的行为和显示形态。一个组件的 state 中的数据可以通过 props 传给子组件，一个组件可以使用外部传入的 props 来初始化自己的 state。但是它们的职责其实非常明晰分明：state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。

### 8、事件处理

React 事件的命名采用小驼峰式（camelCase），而不是纯小写。

使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

这些 onXXX 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。

```js
<button onClick={activateLasers}>Activate Lasers</button>
```

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。

```js
function ActionLink() {
  function handleClick(e) {
    // 阻止默认事件
    e.preventDefault();
    console.log("The link was clicked.");
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

this 问题 解决 this 问题主要有四种方法

第一种方法 在构造函数中使用 bind 方法绑定 this

```js
constructor(props) {
  this.handleClick = this.handleClick.bind(this);
}

<button onClick={this.handleClick}>
  当前开关状态{this.state.isToggleOn ? "ON" : "OFF"}
</button>
```

第二种方法 定义方法的时候使用箭头函数

```js
handleClick = () => {
  this.setState(function (state) {
    return {
      isToggleOn: !state.isToggleOn
    };
  });
};

<button onClick={this.handleClick}>
  当前开关状态{this.state.isToggleOn ? "ON" : "OFF"}
</button>;
```

第三种方法是用箭头函数返回函数

在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用箭头函数定义方法来避免这类性能问题。

```js
<button onClick={() => this.handleClick()}>
  当前开关状态{this.state.isToggleOn ? "ON" : "OFF"}
</button>
```

第四种方法 在使用的地方使用 bind 方法绑定 this

```js
<button onClick={this.handleClick.bind(this)}>
  当前开关状态{this.state.isToggleOn ? "ON" : "OFF"}
</button>
```

函数如果需要传递参数我们只能使用第三和第四种方法

```js
// 使用箭头函数需要显示传递事件对象参数e
<button onClick={e => this.handleClick("randy", e)}>
  当前开关状态{this.state.isToggleOn ? "ON" : "OFF"}
</button>

// 使用bind方法可以不用指定时间对象e
<button onClick={this.handleClick.bind(this, "randy")}>
  当前开关状态{this.state.isToggleOn ? "ON" : "OFF"}
</button>
```

### 9、条件渲染

条件渲染我们可以使用 if 和 && 和三目运算符

阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。在组件的 render 方法中返回 null 并不会影响组件的生命周期。

### 10、循环

我们可以使用 map 或者 for 循环。

元素的 key 只有放在就近的数组上下文中才有意义。

key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值

### 11、状态提升

在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。

父组件把值和方法传递到子组件中，相当于在子组件里面调用父组件的方法。

### 12、组合和继承

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。

### 13、生命周期函数

一、组件在初始化时会触发 5 个钩子函数：

dufaultProps{}

设置默认的 props，es6 中用 static dufaultProps={} 设置组件的默认属性。在整个生命周期只执行一次。

constructor(props)

可以直接在 constructor 中定义 this.state。此时可以访问 this.props。

componentWillMount() 能在一次渲染中多次调用.

组件初始化时调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改 state。

render()

React 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行。此时就不能更改 state 了。

componentDidMount() 目前官方推荐的异步请求是在 componentDidMount 中进行.

组件渲染之后调用，可以通过 this.getDOMNode()获取和操作 dom 节点，只调用一次。

二、在更新时也会触发 5 个钩子函数：

componentWillReceivePorps(nextProps)

组件初始化时不调用，组件接受新的 props 时调用。不管父组件传递给子组件的 props 有没有改变，都会触发。

shouldComponentUpdate(nextProps, nextState)

React 性能优化非常重要的一环。组件接受新的 state 或者 props 时调用，我们可以设置在此对比前后两个 props 和 state 是否相同，如果相同则返回 false 阻止更新，因为相同的属性状态一定会生成相同的 dom 树，这样就不需要创造新的 dom 树和旧的 dom 树进行 diff 算法对比，节省大量性能，尤其是在 dom 结构复杂的时候。不过调用 this.forceUpdate 会跳过此步骤。

componentWillUpdate(nextProps, nextState)

组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改 state

render()

不多说

componentDidUpdate(preProps, preState)

组件初始化时不调用，组件更新完成后调用，此时可以获取 dom 节点。

三、卸载钩子函数

componentWillUnmount() 定时器的清除
组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

新的生命周期方法

React 16 之后有三个生命周期被废弃(但并未删除)componentWillReceivePorps componentWillUpdate componentWillMount

static getDerivedStateFromProps(nextProps,prevState)：接收父组件传递过来的 props 和组件之前的状态，返回一个对象来更新 state 或者返回 null 来表示接收到的 props 没有变化，不需要更新 state。此方法在更新和挂载阶段都可能会调用

getSnapshotBeforeUpdate(prevProps, prevState)：接收父组件传递过来的 props 和组件之前的状态，此生命周期钩子必须有返回值，返回值将作为第三个参数传递给 componentDidUpdate。必须和 componentDidUpdate 一起使用，否则会报错
该生命周期钩子触发的时机 ：被调用于 render 之后、componentDidUpdate 之前

### 14、react 中使用 prop-types 检测 props 数据类型

安装使用

    //安装
    npm install prop-types --save
    //引入
    import PropTypes from 'prop-types';

它可以检测的类型

    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,

```js
import PropTypes from "prop-types";

// class定义中使用方法
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }

  //如果没有传递该属性时的默认值
  static defaultProps = {
    name: "stranger"
  };
  //如果传递该属性，该属性值必须为字符串
  static propTypes = {
    name: PropTypes.string
    // name:PropTypes.string.isRequired 使用isRequired设置属性为必须传递的值
  };
}

// Renders "Hello, Stranger":
ReactDOM.render(<Greeting />, document.getElementById("example"));
```

```js
import PropTypes from "prop-types";
//示例
class Greeting extends React.Component {
  // arrOf和objectOf多重嵌套类型检测
  // An array of a certain type
  // optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  // optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  static propTypes = {
    todoList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string
      })
    )
  };

  // shape检测不同对象的不同属性的不同数据类型
  // An object taking on a particular shape
  // optionalObjectWithShape: PropTypes.shape({
  //   optionalProperty: PropTypes.string,
  //   requiredProperty: PropTypes.number.isRequired
  // }),
  //示例
  static propTypes = {
    object: PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.number
    })
  };
}
```

### 15、使用 Fragments 类似 vue 里面的 template

我们可以将 Fragment 视为不可见的 div。它在子组件将元素包装在标签中，将其带到父组件并消失。 你也可以使用较短的语法，但是它不支持 key 和属性。

```js
import React, { Fragment } from "react";

const Columns = () => {
  return (
    <Fragment>
      <td>Hello</td>
      <td>World</td>
    </Fragment>
  );
  // 较短的语法
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
};

export default Columns;
```

### 16、ref

```js
// 第一种方法
class AutoFocusInput extends Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    return <input ref={input => (this.input = input)} />;
  }
}

// 第二种方法
class AutoFocusInput extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}
```

### 17、动态 html

使用 dangerouslySetInnerHTML

```js
render () {
    return (
      <div
        className='editor-wrapper'
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }
```

### 18、class style

在 react.js 中 class 使用 className 定义。

在 react.js 中 style 接受一个对象，这个对象里面是这个元素的 CSS 属性键值对，原来 CSS 属性中带 - 的元素都必须要去掉 - 换成驼峰命名，如 font-size 换成 fontSize，text-align 换成 textAlign。

```html
<h1 style={{fontSize: '12px', color: 'red'}}>React.js 小书</h1>
```

### 19、高阶组件

高阶组件是一个函数（而不是组件），它接受一个组件作为参数，返回一个新的组件。这个新的组件会使用你传给它的组件作为子组件。

高阶组件的作用其实不言而喻，其实就是为了组件之间的代码复用。组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。高阶组件内部的包装组件和被包装组件之间通过 props 传递数据。

高阶组件类似设计模式里面的装饰者模式

```js
import React, { Component } from "react";

export default WrappedComponent => {
  class NewComponent extends Component {
    // 可以做很多自定义逻辑
    render() {
      return <WrappedComponent />;
    }
  }
  return NewComponent;
};
```

### 20、context

React.js 的 context 就是这么一个东西，某个组件只要往自己的 context 里面放了某些状态，这个组件之下的所有子组件都直接访问这个状态而不需要通过中间组件的传递。一个组件的 context 只有它的子组件能够访问，它的父组件是不能访问到的，你可以理解每个组件的 context 就是瀑布的源头，只能往下流不能往上飞。

```js
// 新版的
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

// 这是老版的
// 第一步 父组件设置context
class Parent extends React.Component {
  // 必须定义 验证 getChildContext 返回的对象
  static childContextTypes = {
    themeColor: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      themeColor: "green"
    };
  }

  getChildContext() {
    return { themeColor: this.state.themeColor };
  }
}

// 第二步 后代组件使用
class Child extends React.Component {
  // 必须定义
  static contextTypes = {
    themeColor: PropTypes.string
  };

  render() {
    return (
      <h1 style={{ color: this.context.themeColor }}>React.js 小书标题</h1>
    );
  }
}

// 第三步
如果我们要改颜色，只需要在 Parent 里面 setState 就可以了，子组件会重新渲染，渲染的时候会重新取 context 的内容
```

一个组件可以通过 getChildContext 方法返回一个对象，这个对象就是子树的 context，提供 context 的组件必须提供 childContextTypes 作为 context 的声明和验证。

如果一个组件设置了 context，那么它的子组件都可以直接访问到里面的内容，它就像这个组件为根的子树的全局变量。任意深度的子组件都可以通过 contextTypes 来声明你想要的 context 里面的哪些状态，然后可以通过 this.context 访问到那些状态。

context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。而且，就如全局变量一样，context 里面的数据能被随意接触就能被随意修改，每个组件都能够改 context 里面的内容会导致程序的运行不可预料。

但是这种机制对于前端应用状态管理来说是很有帮助的，因为毕竟很多状态都会在组件之间进行共享，context 会给我们带来很大的方便。一些第三方的前端应用状态管理的库（例如 Redux）就是充分地利用了这种机制给我们提供便利的状态管理服务。但我们一般不需要手动写 context，也不要用它，只需要用好这些第三方的应用状态管理库就行了。

### 21、React.lazy 懒加载

React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。

然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。

```js
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

### 22、Hook

Hook 使你在非 class 的情况下可以使用更多的 React 特性

使用规则

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中）

```js
// 1、 useState
import React, { useState, useEffect } from "react";

function Example() {
  // 声明一个叫 “count” 的 state 变量。初始值为0，变量名为count 修改count的方法是setCount
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );

  // 相当于 componentDidMount 和 componentDidUpdate:
  // React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。
  // 副作用函数还可以通过返回一个函数来指定如何“清除”副作用。
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
}
```
