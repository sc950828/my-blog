import { fromJS } from 'immutable'
import { 
  GET_MATERIAL_CATEGORY_LISTS_SUCCESSED,
  GET_MATERIAL_CATEGORY_LISTS_FAILED,
  GET_ALL_MATERIAL_CATEGORY_LISTS_SUCCESSED,
  GET_ALL_MATERIAL_CATEGORY_LISTS_FAILED
} from '../actionTypes'

// 使用immutable来管理store中的数据
const defaultState = fromJS({
  materialCategoryLists: [],
  allMaterialCategoryLists: []
})

// 纯函数 必须返回全新的对象
const reducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch(type) {
    case GET_MATERIAL_CATEGORY_LISTS_SUCCESSED:
      return state.set("materialCategoryLists", payload)
    case GET_MATERIAL_CATEGORY_LISTS_FAILED:
      return state.set("materialCategoryLists", payload)
    case GET_ALL_MATERIAL_CATEGORY_LISTS_SUCCESSED:
      return state.set("allMaterialCategoryLists", payload)
    case GET_ALL_MATERIAL_CATEGORY_LISTS_FAILED:
      return state.set("allMaterialCategoryLists", payload)
    default:
      return state
  }
}

export default reducer
