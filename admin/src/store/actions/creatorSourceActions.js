
import * as actionTypes from '../actionTypes'

export const getSourceLists = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_LISTS,
    payload
  }
}

export const getSourceListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_LISTS_SUCCESSED,
    payload
  }
}

export const getSourceListsFailed = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_LISTS_FAILED,
    payload
  }
}

export const getSourceAction = (payload) => {
  return {
    type: actionTypes.GET_SOURCE,
    payload
  }
}

export const getSourceSuccessed = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_SUCCESSED,
    payload
  }
}

export const getSourceFailed = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_FAILED,
    payload
  }
}

export const addSourceAction = (payload) => {
  return {
    type: actionTypes.ADD_SOURCE,
    payload
  }
}

export const deleteSource = (payload) => {
  return {
    type: actionTypes.DELETE_SOURCE,
    payload
  }
}

export const updateSourceAction = (payload) => {
  return {
    type: actionTypes.UPDATE_SOURCE,
    payload
  }
}

export const changeSourceStatusAction = (payload) => {
  return {
    type: actionTypes.CHANGE_SOURCE_STATUS,
    payload
  }
}
