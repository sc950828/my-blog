import { fromJS } from 'immutable'
import { 
  CHANGE_PATH,
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  path: "",
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case CHANGE_PATH:
      return state.set("path", payload)
    default:
      return state
  }
}

export default reducer
