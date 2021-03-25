
import * as actionTypes from '../actionTypes'

export const getSettingLists = (payload) => {
  return {
    type: actionTypes.GET_SETTING_LISTS,
    payload
  }
}

export const getSettingListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_SETTING_LISTS_SUCCESSED,
    payload
  }
}

export const getSettingListsFailed = (payload) => {
  return {
    type: actionTypes.GET_SETTING_LISTS_FAILED,
    payload
  }
}

export const addSettingAction = (payload) => {
  return {
    type: actionTypes.ADD_SETTING,
    payload
  }
}

export const updateSettingAction = (payload) => {
  return {
    type: actionTypes.UPDATE_SETTING,
    payload
  }
}

export const deleteSettingAction = (payload) => {
  return {
    type: actionTypes.DELETE_SETTING,
    payload
  }
}
