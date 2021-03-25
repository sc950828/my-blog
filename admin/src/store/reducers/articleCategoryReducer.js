import { fromJS } from 'immutable'
import { 
  GET_ARTICLE_CATEGORY_LISTS_SUCCESSED,
  GET_ARTICLE_CATEGORY_LISTS_FAILED,
  GET_ARTICLE_CATEGORY_SUCCESSED,
  GET_ARTICLE_CATEGORY_FAILED,
  GET_ALL_ARTICLE_CATEGORY_LISTS_SUCCESSED,
  GET_ALL_ARTICLE_CATEGORY_LISTS_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  articleCategoryLists: [],
  articleCategoryInfo: null,
  allArticleCategoryLists: []
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_ARTICLE_CATEGORY_LISTS_SUCCESSED:
      return state.set("articleCategoryLists", payload)
    case GET_ARTICLE_CATEGORY_LISTS_FAILED:
      return state.set("articleCategoryLists", payload)
    case GET_ARTICLE_CATEGORY_SUCCESSED:
      return state.set("articleCategoryInfo", payload)
    case GET_ARTICLE_CATEGORY_FAILED:
      return state.set("articleCategoryInfo", payload)
    case GET_ALL_ARTICLE_CATEGORY_LISTS_SUCCESSED:
      return state.set("allArticleCategoryLists", payload)
    case GET_ALL_ARTICLE_CATEGORY_LISTS_FAILED:
      return state.set("allArticleCategoryLists", payload)
    default:
      return state
  }
}

export default reducer
