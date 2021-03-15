
import * as actionTypes from '../actionTypes'

export const changePathAction = (payload) => {
  return {
    type: actionTypes.CHANGE_PATH,
    payload
  }
}

export const changeCollapsedAction = (payload) => {
  return {
    type: actionTypes.CHANGE_COLLAPSED,
    payload
  }
}
