
import * as actionTypes from '../actionTypes'

export const getArticleLists = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_LISTS,
    payload
  }
}

export const getArticleListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_LISTS_SUCCESSED,
    payload
  }
}

export const getArticleListsFailed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_LISTS_FAILED,
    payload
  }
}
