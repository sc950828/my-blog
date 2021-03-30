
import * as actionTypes from '../actionTypes'

export const getSourceCategoryLists = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_CATEGORY_LISTS,
    payload
  }
}

export const getSourceCategoryListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_CATEGORY_LISTS_SUCCESSED,
    payload
  }
}

export const getSourceCategoryListsFailed = (payload) => {
  return {
    type: actionTypes.GET_SOURCE_CATEGORY_LISTS_FAILED,
    payload
  }
}
export const getAllSourceCategoryLists = (payload) => {
  return {
    type: actionTypes.GET_ALL_SOURCE_CATEGORY_LISTS,
    payload
  }
}

export const getAllSourceCategoryListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_ALL_SOURCE_CATEGORY_LISTS_SUCCESSED,
    payload
  }
}

export const getAllSourceCategoryListsFailed = (payload) => {
  return {
    type: actionTypes.GET_ALL_SOURCE_CATEGORY_LISTS_FAILED,
    payload
  }
}

export const addSourceCategoryAction = (payload) => {
  return {
    type: actionTypes.ADD_SOURCE_CATEGORY,
    payload
  }
}

export const updateSourceCategoryAction = (payload) => {
  return {
    type: actionTypes.UPDATE_SOURCE_CATEGORY,
    payload
  }
}

export const changeSourceCategoryStatusAction = (payload) => {
  return {
    type: actionTypes.CHANGE_SOURCE_CATEGORY_STATUS,
    payload
  }
}

export const deleteSourceCategoryAction = (payload) => {
  return {
    type: actionTypes.DELETE_SOURCE_CATEGORY,
    payload
  }
}

