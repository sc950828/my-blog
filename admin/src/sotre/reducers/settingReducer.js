import { fromJS } from 'immutable'
import { 
  GET_SETTING_LISTS_SUCCESSED,
  GET_SETTING_LISTS_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  settingLists: []
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_SETTING_LISTS_SUCCESSED:
      return state.set("settingLists", payload)
    case GET_SETTING_LISTS_FAILED:
      return state.set("settingLists", payload)
    default:
      return state
  }
}

export default reducer
