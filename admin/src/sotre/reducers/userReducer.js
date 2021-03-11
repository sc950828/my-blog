import { fromJS } from 'immutable'
import { 
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  CHANGE_STEP,
  SEND_UPDATE_PASSWORD_EMAIL_SUCCESSED,
  SEND_UPDATE_PASSWORD_EMAIL_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  userInfo: null,
  current: 0,
  email: ""
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case LOGIN_SUCCEEDED:
      return state.set("userInfo", payload)
    case LOGIN_FAILED:
      return state.set("userInfo", payload)
    case CHANGE_STEP:
      return state.set("current", payload)
    case SEND_UPDATE_PASSWORD_EMAIL_SUCCESSED:
      return state.set("email", payload)
    case SEND_UPDATE_PASSWORD_EMAIL_FAILED:
      return state.set("email", payload)
    default:
      return state
  }
}

export default reducer
