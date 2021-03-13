
import * as actionTypes from '../actionTypes'

export const getArticleCategoryLists = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_CATEGORY_LISTS,
    payload
  }
}

export const getArticleCategoryListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_CATEGORY_LISTS_SUCCESSED,
    payload
  }
}

export const getArticleCategoryListsFailed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_CATEGORY_LISTS_FAILED,
    payload
  }
}
