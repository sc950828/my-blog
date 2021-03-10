// import {combineReducers} from 'redux'
// 数据统一 使用immutable管理数据 所以从 redux-immutable 获取combineReducers
import { combineReducers } from 'redux-immutable'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  user: userReducer
})

export default reducers
