### redux 核心

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

state 是数据集合

action 就是改变 state 的指令，有多少操作 state 的动作就会有多少 action。action 本质上是一个 JavaScript 对象，其中必须包含一个 type 字段来表示将要执行的动作，其他的字段都可以根据需求来自定义。

reducer 加工函数。 action 发出命令后将 state 放入 reucer 加工函数中，返回新的 state。必须是纯函数。

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。纯函数很严格，也就是说你几乎除了计算数据以外什么都不能干，计算的时候还不能依赖除了函数参数以外的数据。如果函数调用的参数相同则永远返会相同的结果。

reducer(previousState, action)。当有多个 reducer 的时候我们使用 combineReducers()来合并 reducer，类似 vuex 里面的 module。

store 通过 createStore(reducers)来创建 store

- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。

```js
import { createStore } from "redux";

// 通过createStore方法传递reducer来创建store
const store = createStore(
  reducers,
  // 如果使用了redux devtools需要添加这行代码
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 通过getState方法来获取state
const state = store.getState();

// 通过dispatch触发action
store.dispatch({ type: xx, payload: xx });

// 监听state的改变进行相应处理
let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
  this.setState(store.getState());
});

unsubscribe();
```

### 三大原则

单一数据源。整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。只能通过 store.getState()获取到 state。

State 是只读的。唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。使用 store.dispatch()来提交 action。

使用纯函数来执行修改。Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

### react-redux

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

// mapStateToProps是一个函数，它接受state作为参数，返回一个对象。
// 返回的todos在组件中通过this.props.todos访问
// 注意如果使用了 combineReducers()来创建reducer这里的state需要通过reducer区分，类似vuex里的module
// state是所有的reducer里面的state
// 当一个触发一个action的时候会触发所有的reducer 然后在里面判断类型 所以reducer里面的type不能相同
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
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
        filter: ownProps.filter,
      });
    },
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

// 一般开发我们分为四个部分
// reducer 纯函数
// actionTypes 定义action的types
// actionCreators 创建action 就是方法返会action对象 {type: xx, payload: xx}
// index 创建store 通过createStore方法
```

### 例子

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
  Reducer2,
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
      updateName,
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
  // 这里是store里面的state 所有的reducer里面的state都能获取到
  console.log(state);
  return {
    value: state.Reducer1.count,
    name1: state.Reducer2.name1,
    age: state.Reducer2.age,
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
    // 触发一个action 所有的reducer都被调用 所type不能相同
    onIncreaseClick: () => dispatch({ type: "increase", qq: "randy" }),
    updateName: () => dispatch({ type: "updatename" }),
    updateAge: () => dispatch({ type: "updateage" }),
  };
}

// 传入上面两个函数参数，将Container组件变为容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Container);
```

### 中间件

比如在 Dispatch 一个 Action 之后，到达 reducer 之前，进行一些额外的操作，就需要用到 middleware（中间件）。

在实际工作中你可以使用中间件来进行日志记录、创建崩溃报告，调用异步接口或者路由。

异步请求中间件

redux-thunk

```js
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// 使用中间件 使用applyMiddleware方法
const store = createStore(reducer, applyMiddleware(thunk));

// 但是我们的Redux Dev Tools插件就不能使用了，如果想两个同时使用，需要使用增强函数。使用增加函数前需要先引入compose。

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer); // 创建数据存储仓库
```

以前 actionCreators.js 都是定义好的 action，根本没办法写业务逻辑，有了 Redux-thunk 之后，可以把 TodoList.js 中的 componentDidMount 业务逻辑放到这里来编写。也就是把向后台请求数据的代码放到 actionCreators.js 文件里。那我们需要引入 axios,并写一个新的函数方法。（以前的 action 是对象，现在的 action 可以是函数了，这就是 redux-thunk 带来的好处）

```js
// actionCreators.js
import axios from 'axios'
// action可以是函数 可以后台请求数据 这就是redux-thunk的好处
export const getTodoList = () =>{
    return (dispatch)=>{
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
            // 真实获取数据再提交action
            dispatch({type: 'getData', data: res.data})
        })
    }
}

// index.js
import {getTodoList} from './actionCreators'

componentDidMount() {
  // 这里的action是函数 获取异步数据
  const action = getTodoList()
  store.dispatch(action)
}
```

redux-thunk 优点:

- 体积小: redux-thunk 的实现方式很简单,只有不到 20 行代码
- 使用简单: redux-thunk 没有引入像 redux-saga 或者 redux-observable 额外的范式,上手简单

redux-thunk 缺陷:

- 样板代码过多: 与 redux 本身一样,通常一个请求需要大量的代码,而且很多都是重复性质的
- 耦合严重: 异步操作与 redux 的 action 偶合在一起,不方便管理
- 功能孱弱: 有一些实际开发中常用的功能需要自己进行封装

redux-saga

```js
// 安装redux-saga npm install redux-saga

// 引入saga
import createSagaMiddleware from "redux-saga";
// 引入所有的异步generator方法
import mySaga from "mySaga";

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// 使用中间件
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer); // 创建数据存储仓库

// 启动saga 通过传入的saga函数
sagaMiddleware.run(mySaga);
```

使用

```js
// sagas.js
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import Api from "...";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// 副作用方法获取后台数 通过call接口调用api
// 获取到数据然后使用put方法提交action 把stat存储到store
function* fetchUser(action) {
  try {
    // call调用异步api
    const user = yield call(Api.fetchUser, action.payload.userId);
    // put触发action 真正存储数据
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// 导出的方法是用来监听的 监听到外部有dispatch相同的action就触发副作用异步请求方法
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// 导出的方法是用来监听的 监听到外部有dispatch相同的action就触发副作用异步请求方法
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;

// 自定义类使用 当触发某个action的时候 会被sagas里面的takeEvery或者takeLatest捕获调取相应的异步方法
class UserComponent extends React.Component {
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props;
    dispatch({ type: "USER_FETCH_REQUESTED", payload: { userId: xx } });
  }
}
```

redux-saga 优点:

- 异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
- action 摆脱 thunk function: dispatch 的参数依然是一个纯粹的 action (FSA)，而不是充满 “黑魔法” thunk function
- 异常处理: 受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
- 功能强大: redux-saga 提供了大量的 Saga 辅助函数和 Effect 创建器供开发者使用,开发者无须封装或者简单封装即可使用
- 灵活: redux-saga 可以将多个 Saga 可以串行/并行组合起来,形成一个非常实用的异步 flow
- 易测试，提供了各种 case 的测试方案，包括 mock task，分支覆盖等等

redux-saga 缺陷:

- 额外的学习成本: redux-saga 不仅在使用难以理解的 generator function,而且有数十个 API,学习成本远超 redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与 redux-observable 不同,redux-observable 虽然也有额外学习成本但是背后是 rxjs 和一整套思想
- 体积庞大: 体积略大,代码近 2000 行，min 版 25KB 左右
- 功能过剩: 实际上并发控制等功能很难用到,但是我们依然需要引入这些代码
- ts 支持不友好: yield 无法返回 TS 类型
