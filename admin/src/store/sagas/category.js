import { call, put, takeLatest } from 'redux-saga/effects'
import { getCategoryList} from '../../api/category'
import {  GET_CATEGORY_LISTS } from '../actionTypes'
import {getCategoryListsSuccessed, getCategoryListsFailed} from '../actions/creatorCategoryActions'

function* _getCategoryLists(action) {
  try {
    // 获取分类列表
    const result = yield call(getCategoryList, action.payload);
    // 进入下一步
    yield put(getCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getCategoryListsFailed([]));
  }
}

function* getCategoryLists() {
  yield takeLatest(GET_CATEGORY_LISTS, _getCategoryLists);
}

const sagas = {
  getCategoryLists
}

export default sagas
