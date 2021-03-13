
import * as actionTypes from '../actionTypes'

export const getMaterialLists = (payload) => {
  return {
    type: actionTypes.GET_MATERIAL_LISTS,
    payload
  }
}

export const getMaterialListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_MATERIAL_LISTS_SUCCESSED,
    payload
  }
}

export const getMaterialListsFailed = (payload) => {
  return {
    type: actionTypes.GET_MATERIAL_LISTS_FAILED,
    payload
  }
}
