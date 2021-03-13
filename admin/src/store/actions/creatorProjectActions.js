
import * as actionTypes from '../actionTypes'

export const getProjectLists = (payload) => {
  return {
    type: actionTypes.GET_PROJECT_LISTS,
    payload
  }
}

export const getProjectListsSuccessed = (payload) => {
  return {
    type: actionTypes.GET_PROJECT_LISTS_SUCCESSED,
    payload
  }
}

export const getProjectListsFailed = (payload) => {
  return {
    type: actionTypes.GET_PROJECT_LISTS_FAILED,
    payload
  }
}
