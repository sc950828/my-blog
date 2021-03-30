import { fromJS } from 'immutable'
import { 
  GET_SOURCE_LISTS_SUCCESSED,
  GET_SOURCE_LISTS_FAILED,
  GET_SOURCE_SUCCESSED,
  GET_SOURCE_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  sourceLists: [],
  sourceInfo: null
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_SOURCE_LISTS_SUCCESSED:
      return state.set("sourceLists", payload)
    case GET_SOURCE_LISTS_FAILED:
      return state.set("sourceLists", payload)
    case GET_SOURCE_SUCCESSED:
      return state.set("sourceInfo", payload)
    case GET_SOURCE_FAILED:
      return state.set("sourceInfo", payload)
    default:
      return state
  }
}

export default reducer
