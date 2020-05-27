import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Reducers from "./redux/Reducers";

// 异步处理 thunk
import thunk from "redux-thunk";
// 异步处理saga
import createSagaMiddleware from "redux-saga";
import sagas from "./redux/sagas";
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
// 使用增强函数 使用两个中间件
// 使用thunk中间件
// const enhancer = composeEnhancers(applyMiddleware(thunk));
// 使用saga中间件
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

// 根据reducer函数通过createStore()创建store
const store = createStore(Reducers, enhancer);

// 启用sagas里面的方法
sagaMiddleware.run(sagas);

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
