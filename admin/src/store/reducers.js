// import {combineReducers} from 'redux'
// 数据统一 使用immutable管理数据 所以从 redux-immutable 获取combineReducers
import { combineReducers } from 'redux-immutable'
import userReducer from './reducers/userReducer'
import menuReducer from './reducers/menuReducer'
import settingReducer from './reducers/settingReducer'
import articleCategoryReducer from './reducers/articleCategoryReducer'
import articleReducer from './reducers/articleReducer'
import materialCategoryReducer from './reducers/materialCategoryReducer'
import materialReducer from './reducers/materialReducer'

const reducers = combineReducers({
  user: userReducer,
  menu: menuReducer,
  setting: settingReducer,
  articleCategory: articleCategoryReducer,
  article: articleReducer,
  materialCategory: materialCategoryReducer,
  material: materialReducer,
})

export default reducers
