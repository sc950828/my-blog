
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

export const addMaterialAction = (payload) => {
  return {
    type: actionTypes.ADD_MATERIAL,
    payload
  }
}

export const deleteMaterial = (payload) => {
  return {
    type: actionTypes.DELETE_MATERIAL,
    payload
  }
}

export const updateMaterial = (payload) => {
  return {
    type: actionTypes.UPDATE_MATERIAL,
    payload
  }
}
