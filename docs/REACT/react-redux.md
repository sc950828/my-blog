### 1、redux 核心

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

state 是数据集合

action 就是改变 state 的指令，有多少操作 state 的动作就会有多少 action。action 本质上是一个 JavaScript 对象，其中必须包含一个 type 字段来表示将要执行的动作，其他的字段都可以根据需求来自定义。

reducer 加工函数。 action 发出命令后将 state 放入 reucer 加工函数中，返回新的 state。必须是纯函数。
reducer(previousState, action)。当有多个 reducer 的时候我们使用 combineReducers()来合并 reducer，类似 vuex 里面的 module。

store 通过 createStore(reducers)来创建 store

- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。

```js
let unsubscribe = store.subscribe(() => {
  console.log(store.getState()); //监控这手下的一举一动
});
store.dispatch(toggleTodo({ items: todoDemoList, id: 1 })); //老大在watching，小心翼翼。
unsubscribe(); //放了你们，出去浪吧
```

### 2、三大原则

单一数据源。整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。只能通过 store.getState()获取到 state。

State 是只读的。唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。使用 store.dispatch()来提交 action。

使用纯函数来执行修改。Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

### 3、react-redux

react-redux 官方提供的 React 绑定库。 具有高效且灵活的特性。
Redux 本身和 React 没有关系，只是数据处理中心，是 React-Redux 让他们联系在一起。

核心

- connect
- provider

```js
// connect
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]);

// TodoList是 UI 组件，VisibleTodoList就是由 react-redux 通过connect方法自动生成的容器组件
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

// mapStateToProps：从Redux状态树中提取需要的部分作为props传递给当前的组件。
// mapDispatchToProps：将需要绑定的响应事件（action）作为props传递到组件上。

mapStateToProps();
// 它是一个函数，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
// mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。

// 注意如果使用了 combineReducers()来创建reducer这里的state需要通过reducer区分，类似vuex里的module

// mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，
// 代表 UI 组件的同名参数，值是state的todos
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

mapDispatchToProps();
// mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。
// 它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

// 是函数则会得到dispatch和ownProps（容器组件的props对象）两个参数。
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: "SET_VISIBILITY_FILTER",
        filter: ownProps.filter
      });
    }
  };
};
// 从上面代码可以看到，mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，
// 定义了 UI 组件的参数怎样发出 Action。

// Provider
// Provider实现store的全局访问，将store传给每个组件。
// 原理：使用React的context，context可以实现跨组件之间的传递。

import { Provider } from "react-redux";
import { createStore } from "redux";
import todoApp from "./reducers";
import App from "./components/App";

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### 4、例子

```js
// Reducer1.js
export default function counter(state = { count: 0 }, action) {
  // 只能访问到自身的状态 不能访问到别的reducer里面的state
  console.log(state);
  // 获取action对象 {type: "increase", qq: "randy"}
  console.log(action);
  const count = state.count;
  switch (action.type) {
    case "increase":
      return { ...state, count: count + 1 };
    default:
      return state;
  }
}

// Reducer2.js
// Reducer 基于原有state根据action得到新的state
export default function addAge(state = { age: 24, name1: "randy" }, action) {
  const age = state.age;
  const name1 = state.name1;
  // 这里的state第一次是我们给的初始值 后面再提交的时候就是老值 然后我们需要更新 返回新的state
  switch (action.type) {
    case "updateage":
      return { ...state, age: age + 1 };
    case "updatename":
      return { ...state, name1: name1 + 1 };
    default:
      return state;
  }
}

// Reduces.js
import { combineReducers } from "redux";
import Reducer1 from "./Reducer1";
import Reducer2 from "./Reducer2";

// 合并成一个reducer
export default combineReducers({
  Reducer1,
  Reducer2
});

// index.js
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducers from "./redux/Reducers";

// 根据reducer函数通过createStore()创建store
const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

import React from "react";
import { connect } from "react-redux";

// Container.js
class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value,
      onIncreaseClick,
      age,
      name1,
      updateAge,
      updateName
    } = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}> +1</button>
        <span>{name1}</span>
        <button onClick={updateName}> updateName</button>
        <span>{age}</span>
        <button onClick={updateAge}> updateAge</button>
      </div>
    );
  }
}

//  将state映射到Container组件的props
function mapStateToProps(state) {
  // 这里是store里面的state
  console.log(state);
  return {
    value: state.Reducer1.count,
    name1: state.Reducer2.name1,
    age: state.Reducer2.age
  };
}

//  将action映射到Container组件的props
function mapDispatchToProps(dispatch, ownprops) {
  // 组件自身的props 有history location match staticContext
  console.log(ownprops);
  // history: {length: 50, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
  // location: {pathname: "/container", search: "", hash: "", state: undefined, key: "j3yu28"}
  // match: {path: "/container", url: "/container", isExact: true, params: {…}}
  // staticContext: undefined
  return {
    onIncreaseClick: () => dispatch({ type: "increase", qq: "randy" }),
    updateName: () => dispatch({ type: "updatename" }),
    updateAge: () => dispatch({ type: "updateage" })
  };
}

// 传入上面两个函数参数，将Container组件变为容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Container);
```
