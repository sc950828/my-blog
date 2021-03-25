
import * as actionTypes from '../actionTypes'

export const login = (payload) => {
  return {
    type: actionTypes.LOGIN,
    payload
  }
}

export const logout = (payload) => {
  return {
    type: actionTypes.LOGOUT,
    payload
  }
}


export const loginSuccessed = (payload) => {
  return {
    type: actionTypes.LOGIN_SUCCEEDED,
    payload
  }
}

export const loginFailed = (payload) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload
  }
}

export const getUserInfoAction = () => {
  return {
    type: actionTypes.GET_USER_INFO
  }
}

export const getUserInfoByIdAction = (payload) => {
  return {
    type: actionTypes.GET_USER_INFO_BY_ID,
    payload
  }
}

export const getUserInfoByIdSuccessed = (payload) => {
  return {
    type: actionTypes.GET_USER_INFO_BY_ID_SUCCESSED,
    payload
  }
}

export const getUserInfoByIdFailed = (payload) => {
  return {
    type: actionTypes.GET_USER_INFO_BY_ID_FAILED,
    payload
  }
}

export const deleteUserAction = (payload) => {
  return {
    type: actionTypes.DELETE_USER,
    payload
  }
}

export const addUserAction = (payload) => {
  return {
    type: actionTypes.ADD_USER,
    payload
  }
}

export const updateUserAction = (payload) => {
  return {
    type: actionTypes.UPDATE_USER,
    payload
  }
}

export const changeStepAction = (payload) => {
  return {
    type: actionTypes.CHANGE_STEP,
    payload
  }
}

export const sendUpdatePasswordEmail = (payload) => {
  return {
    type: actionTypes.SEND_UPDATE_PASSWORD_EMAIL,
    payload
  }
}

export const sendUpdatePasswordEmailSuccessed = (payload) => {
  return {
    type: actionTypes.SEND_UPDATE_PASSWORD_EMAIL_SUCCESSED,
    payload
  }
}

export const sendUpdatePasswordEmailFailed = (payload) => {
  return {
    type: actionTypes.SEND_UPDATE_PASSWORD_EMAIL_FAILED,
    payload
  }
}

export const verifyUpdatePasswordEmailCode = (payload) => {
  return {
    type: actionTypes.VERIFY_UPDATE_PASSWORD_CODE,
    payload
  }
}

export const changePassword = (payload) => {
  return {
    type: actionTypes.CHANGE_PASSWORD,
    payload
  }
}

export const changePasswordByOldPwdAction = (payload) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_BY_OLD_PASSWORD,
    payload
  }
}

export const getUserLists = (payload) => {
  return {
    type: actionTypes.GET_USER_LISTS,
    payload
  }
}

export const getUserListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_USER_LISTS_SUCCESSED,
    payload
  }
}

export const getUserListsFailed = (payload) => {
  return {
    type: actionTypes.GET_USER_LISTS_FAILED,
    payload
  }
}

export const changeUserStatusAction = (payload) => {
  return {
    type: actionTypes.CHANGE_USER_STATUS,
    payload
  }
}
