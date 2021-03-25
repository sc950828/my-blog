import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import runSagas from './sagas'


// 不使用中间件 使用devtools
// const store = createStore(
//   reducers, /* preloadedState, */
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// 使用中间件 基本用法 如果需要使用devtools 则不能简单的这么写
// const store = createStore(
//   reducers,
//   applyMiddleware(sagaMiddleware)
// )

// 既使用中间件 也使用devtools
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers, 
  composeEnhancers(applyMiddleware(sagaMiddleware))
);


// then run the saga
runSagas(sagaMiddleware)

export default store
