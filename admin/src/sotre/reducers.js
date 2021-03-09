import {combineReducers} from 'redux'
import passwordReducer from './passwordReducer'

const reducers = combineReducers({
  password: passwordReducer
})

export default reducers
