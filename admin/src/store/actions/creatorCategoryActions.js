
import * as actionTypes from '../actionTypes'

export const getCategoryLists = (payload) => {
  return {
    type: actionTypes.GET_CATEGORY_LISTS,
    payload
  }
}

export const getCategoryListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_CATEGORY_LISTS_SUCCESSED,
    payload
  }
}

export const getCategoryListsFailed = (payload) => {
  return {
    type: actionTypes.GET_CATEGORY_LISTS_FAILED,
    payload
  }
}
