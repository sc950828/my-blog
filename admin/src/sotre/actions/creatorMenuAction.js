
import * as actionTypes from '../actionTypes'

export const changePathAction = (payload) => {
  return {
    type: actionTypes.CHANGE_PATH,
    payload
  }
}
