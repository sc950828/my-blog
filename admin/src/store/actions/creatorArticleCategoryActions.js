
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

export const getAllArticleCategoryLists = () => {
  return {
    type: actionTypes.GET_ALL_ARTICLE_CATEGORY_LISTS
  }
}

export const getAllArticleCategoryListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_ALL_ARTICLE_CATEGORY_LISTS_SUCCESSED,
    payload
  }
}

export const getAllArticleCategoryListsFailed = (payload) => {
  return {
    type: actionTypes.GET_ALL_ARTICLE_CATEGORY_LISTS_FAILED,
    payload
  }
}

export const getArticleCategoryAction = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_CATEGORY,
    payload
  }
}

export const getArticleCategorySuccessed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_CATEGORY_SUCCESSED,
    payload
  }
}

export const getArticleCategoryFailed = (payload) => {
  return {
    type: actionTypes.GET_ARTICLE_CATEGORY_FAILED,
    payload
  }
}

export const addArticleCategoryAction = (payload) => {
  return {
    type: actionTypes.ADD_ARTICLE_CATEGORY,
    payload
  }
}

export const updateArticleCategoryAction = (payload) => {
  return {
    type: actionTypes.UPDATE_ARTICLE_CATEGORY,
    payload
  }
}

export const deleteArticleCategoryAction = (payload) => {
  return {
    type: actionTypes.DELETE_ARTICLE_CATEGORY,
    payload
  }
}

export const changeArticleCategoryStatusAction = (payload) => {
  return {
    type: actionTypes.CHANGE_ARTICLE_CATEGORY_STATUS,
    payload
  }
}
