// import {combineReducers} from 'redux'
// 数据统一 使用immutable管理数据 所以从 redux-immutable 获取combineReducers
import { combineReducers } from 'redux-immutable'
import userReducer from './reducers/userReducer'
import menuReducer from './reducers/menuReducer'
import settingReducer from './reducers/settingReducer'
import categoryReducer from './reducers/categoryReducer'
import articleReducer from './reducers/articleReducer'

const reducers = combineReducers({
  user: userReducer,
  menu: menuReducer,
  setting: settingReducer,
  category: categoryReducer,
  article: articleReducer
})

export default reducers
