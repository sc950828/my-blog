import { fromJS } from 'immutable'
import { 
  GET_SOURCE_CATEGORY_LISTS_SUCCESSED,
  GET_SOURCE_CATEGORY_LISTS_FAILED,
  GET_ALL_SOURCE_CATEGORY_LISTS_SUCCESSED,
  GET_ALL_SOURCE_CATEGORY_LISTS_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  sourceCategoryLists: [],
  allSourceCategoryLists: []
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_SOURCE_CATEGORY_LISTS_SUCCESSED:
      return state.set("sourceCategoryLists", payload)
    case GET_SOURCE_CATEGORY_LISTS_FAILED:
      return state.set("sourceCategoryLists", payload)
    case GET_ALL_SOURCE_CATEGORY_LISTS_SUCCESSED:
      return state.set("allSourceCategoryLists", payload)
    case GET_ALL_SOURCE_CATEGORY_LISTS_FAILED:
      return state.set("allSourceCategoryLists", payload)
    default:
      return state
  }
}

export default reducer
