import { fromJS } from 'immutable'
import { 
  GET_CATEGORY_LISTS_SUCCESSED,
  GET_CATEGORY_LISTS_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  categoryLists: []
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_CATEGORY_LISTS_SUCCESSED:
      return state.set("categoryLists", payload)
    case GET_CATEGORY_LISTS_FAILED:
      return state.set("categoryLists", payload)
    default:
      return state
  }
}

export default reducer
