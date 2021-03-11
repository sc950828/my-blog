
import * as actionTypes from '../actionTypes'

export const login = (payload) => {
  return {
    type: actionTypes.LOGIN,
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
