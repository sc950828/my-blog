
import * as actionTypes from '../actionTypes'

export const getMaterialCategoryLists = (payload) => {
  return {
    type: actionTypes.GET_MATERIAL_CATEGORY_LISTS,
    payload
  }
}

export const getMaterialCategoryListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_MATERIAL_CATEGORY_LISTS_SUCCESSED,
    payload
  }
}

export const getMaterialCategoryListsFailed = (payload) => {
  return {
    type: actionTypes.GET_MATERIAL_CATEGORY_LISTS_FAILED,
    payload
  }
}
export const getAllMaterialCategoryLists = (payload) => {
  return {
    type: actionTypes.GET_ALL_MATERIAL_CATEGORY_LISTS,
    payload
  }
}

export const getAllMaterialCategoryListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_ALL_MATERIAL_CATEGORY_LISTS_SUCCESSED,
    payload
  }
}

export const getAllMaterialCategoryListsFailed = (payload) => {
  return {
    type: actionTypes.GET_ALL_MATERIAL_CATEGORY_LISTS_FAILED,
    payload
  }
}

export const addMaterialCategoryAction = (payload) => {
  return {
    type: actionTypes.ADD_MATERIAL_CATEGORY,
    payload
  }
}

export const updateMaterialCategoryAction = (payload) => {
  return {
    type: actionTypes.UPDATE_MATERIAL_CATEGORY,
    payload
  }
}

export const deleteMaterialCategoryAction = (payload) => {
  return {
    type: actionTypes.DELETE_MATERIAL_CATEGORY,
    payload
  }
}

