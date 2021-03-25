import { fromJS } from 'immutable'
import { 
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  CHANGE_STEP,
  SEND_UPDATE_PASSWORD_EMAIL_SUCCESSED,
  SEND_UPDATE_PASSWORD_EMAIL_FAILED,
  GET_USER_LISTS_SUCCESSED,
  GET_USER_LISTS_FAILED,
  GET_USER_INFO_BY_ID_SUCCESSED,
  GET_USER_INFO_BY_ID_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  userInfo: null,
  current: 0,
  email: "",
  userLists: [],
  currentUserInfo: null
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case LOGIN_SUCCEEDED:
      return state.set("userInfo", payload)
    case LOGIN_FAILED:
      return state.set("userInfo", payload)
    case GET_USER_INFO_BY_ID_SUCCESSED:
      return state.set("currentUserInfo", payload)
    case GET_USER_INFO_BY_ID_FAILED:
      return state.set("currentUserInfo", payload)
    case CHANGE_STEP:
      return state.set("current", payload)
    case SEND_UPDATE_PASSWORD_EMAIL_SUCCESSED:
      return state.set("email", payload)
    case SEND_UPDATE_PASSWORD_EMAIL_FAILED:
      return state.set("email", payload)
    case GET_USER_LISTS_SUCCESSED:
      return state.set("userLists", payload)
    case GET_USER_LISTS_FAILED:
      return state.set("userLists", payload)
    default:
      return state
  }
}

export default reducer
