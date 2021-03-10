import { fromJS } from 'immutable'
import { 
  LOGIN_SUCCEEDED, 
  LOGIN_FAILED, 
  CHANGE_STEP, 
  SEND_EMAIL_SUCCESSED,
  SEND_EMAIL_FAILED, 
  VERIFY_CODE, 
  UPDATE_PASSWORD } from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  userInfo: null,
  current: 0,
  email: "",
  code: "",
  password: ""
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
    case SEND_EMAIL_SUCCESSED:
      return state.set("email", payload)
    case SEND_EMAIL_FAILED:
      return state.set("email", payload)
    case VERIFY_CODE:
      return state.set("code", payload)
    case UPDATE_PASSWORD:
      return state.set("password", payload)
    default:
      return defaultState
  }
}

export default reducer
