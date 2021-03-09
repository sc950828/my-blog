const defaultState = {hasChange: false}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'change_true':
      return {...state, hasChange: true}
      case 'change_false':
        return {...state, hasChange: false}
    default:
      return defaultState
  }
}

export default reducer
