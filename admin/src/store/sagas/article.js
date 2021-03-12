import { call, put, takeLatest } from 'redux-saga/effects'
import { getArticleList} from '../../api/article'
import {  GET_ARTICLE_LISTS } from '../actionTypes'
import {getArticleListsSuccessed, getArticleListsFailed} from '../actions/creatorArticleActions'

function* _getArticleLists(action) {
  try {
    // 获取文章列表
    const result = yield call(getArticleList, action.payload);
    // 进入下一步
    yield put(getArticleListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getArticleListsFailed([]));
  }
}

function* getArticleLists() {
  yield takeLatest(GET_ARTICLE_LISTS, _getArticleLists);
}

const sagas = {
  getArticleLists
}

export default sagas
