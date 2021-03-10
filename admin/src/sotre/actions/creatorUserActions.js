
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

export const sendEmail = (payload) => {
  return {
    type: actionTypes.SEND_EMAIL,
    payload
  }
}

export const sendEmailSuccessed = (payload) => {
  return {
    type: actionTypes.SEND_EMAIL_SUCCESSED,
    payload
  }
}

export const sendEmailFailed = (payload) => {
  return {
    type: actionTypes.SEND_EMAIL_FAILED,
    payload
  }
}
