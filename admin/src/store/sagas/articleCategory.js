import { call, put, takeLatest } from 'redux-saga/effects'
import { getArticleCategoryList} from '../../api/articleCategory'
import {  GET_ARTICLE_CATEGORY_LISTS } from '../actionTypes'
import {getArticleCategoryListsSuccessed, getArticleCategoryListsFailed} from '../actions/creatorArticleCategoryActions'

function* _getArticleCategoryLists(action) {
  try {
    // 获取分类列表
    const result = yield call(getArticleCategoryList, action.payload);
    // 进入下一步
    yield put(getArticleCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getArticleCategoryListsFailed([]));
  }
}

function* getArticleCategoryLists() {
  yield takeLatest(GET_ARTICLE_CATEGORY_LISTS, _getArticleCategoryLists);
}

const sagas = {
  getArticleCategoryLists
}

export default sagas
