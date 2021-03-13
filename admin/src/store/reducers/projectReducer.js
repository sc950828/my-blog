import { fromJS } from 'immutable'
import { 
  GET_PROJECT_LISTS_SUCCESSED,
  GET_PROJECT_LISTS_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  projectLists: []
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_PROJECT_LISTS_SUCCESSED:
      return state.set("projectLists", payload)
    case GET_PROJECT_LISTS_FAILED:
      return state.set("projectLists", payload)
    default:
      return state
  }
}

export default reducer
