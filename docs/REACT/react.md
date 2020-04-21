### 1、创建 react 应用

    全局安装 create-react-app npm i create-react-app -g
    创建项目 create-react-app projectName
    运行项目 cd projectName npm start

    还可以单独使用 npm 安装
    npm init react-app projectName

    还可以单独使用 yarn 安装
    yarn create react-app projectName

### 2、 jsx

JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

### 3、渲染

    const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));

### 4、组件

组件分为函数组件与 class 组件。函数组件就是无状态组件，class 组件就是有状态组件。

### 5、 props

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

React 是单向数据流，数据通过 props 从父节点传递到子节点。如果顶层的某个 props 改变了， React 会重新渲染所有的子节点。注意：props 是只读的（即不可以使用 this.props 直接修改 props），它是用于在整个组件树中传递数据和配置。

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

### 7、事件处理

React 事件的命名采用小驼峰式（camelCase），而不是纯小写。

使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

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

### 8、条件渲染

条件渲染我们可以使用 if 和 && 和三目运算符

阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。在组件的 render 方法中返回 null 并不会影响组件的生命周期。

### 9、循环

我们可以使用 map 或者 for 循环。

元素的 key 只有放在就近的数组上下文中才有意义。

key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值
