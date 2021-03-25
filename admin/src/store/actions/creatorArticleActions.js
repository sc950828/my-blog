
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

export const getArticleAction = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE,
    payload
  }
}

export const getArticleSuccessed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_SUCCESSED,
    payload
  }
}

export const getArticleFailed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_FAILED,
    payload
  }
}

export const addArticleAction = (payload) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    payload
  }
}

export const updateArticleAction = (payload) => {
  return {
    type: actionTypes.UPDATE_ARTICLE,
    payload
  }
}

export const deleteArticleAction = (payload) => {
  return {
    type: actionTypes.DELETE_ARTICLE,
    payload
  }
}

export const changeArticleStatusAction = (payload) => {
  return {
    type: actionTypes.CHANGE_ARTICLE_STATUS,
    payload
  }
}
