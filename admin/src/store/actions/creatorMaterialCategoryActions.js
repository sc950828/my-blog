
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
