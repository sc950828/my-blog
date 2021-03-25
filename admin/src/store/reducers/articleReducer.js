import { fromJS } from 'immutable'
import { 
  GET_ARTICLE_LISTS_SUCCESSED,
  GET_ARTICLE_LISTS_FAILED,
  GET_ARTICLE_SUCCESSED,
  GET_ARTICLE_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  articleLists: [],
  articleInfo: null
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_ARTICLE_LISTS_SUCCESSED:
      return state.set("articleLists", payload)
    case GET_ARTICLE_LISTS_FAILED:
      return state.set("articleLists", payload)
    case GET_ARTICLE_SUCCESSED:
      return state.set("articleInfo", payload)
    case GET_ARTICLE_FAILED:
      return state.set("articleInfo", payload)
    default:
      return state
  }
}

export default reducer
