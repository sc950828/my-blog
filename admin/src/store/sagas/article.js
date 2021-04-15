import { call, put, takeLatest } from 'redux-saga/effects'
import { getArticleList, getArticle, addArticle, updateArticle, deleteArticle, updateArticleStatus} from '../../api/article'
import {  GET_ARTICLE_LISTS, GET_ARTICLE, ADD_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE, CHANGE_ARTICLE_STATUS } from '../actionTypes'
import {getArticleListsSuccessed, getArticleListsFailed, getArticleSuccessed, getArticleFailed} from '../actions/creatorArticleActions'
import {message} from 'antd'

function* _getArticleLists(action={}) {
  try {
    // 获取文章列表
    const result = yield call(getArticleList, action.payload);
    // 存储到store
    yield put(getArticleListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getArticleListsFailed([]));
  }
}

function* getArticleLists() {
  yield takeLatest(GET_ARTICLE_LISTS, _getArticleLists);
}

function* _getArticleById(action) {
  try {
    // 获取文章通过id
    const {setFormData, id} = action.payload
    const result = yield call(getArticle, id);
    yield put(getArticleSuccessed(result));
    setFormData()
  } catch (e) {
    console.error(e)
    yield put(getArticleFailed(null));
  }
}

function* getArticleSaga() {
  yield takeLatest(GET_ARTICLE, _getArticleById);
}

function* _addArticle(action) {
  try {
    const {goArticle, title, description, content, banner, isPublish, articleCategory} = action.payload
    // 添加文章分类
    yield call(addArticle, {title, description, content, banner, isPublish, articleCategory});
    message.success("文章添加成功")
    // 返回列表
    goArticle()
  } catch (e) {
    console.error(e)
  }
}

function* addArticleSaga() {
  yield takeLatest(ADD_ARTICLE, _addArticle);
}

function* _updateArticle(action) {
  try {
    const {goArticle, id, title, description, content, banner, isPublish, articleCategory} = action.payload
    // 编辑文章分类
    yield call(updateArticle, {id, title, description, content, banner, isPublish, articleCategory});
    message.success("文章编辑成功")
    // 返回列表
    goArticle()
  } catch (e) {
    console.error(e)
  }
}

function* updateArticleSaga() {
  yield takeLatest(UPDATE_ARTICLE, _updateArticle);
}

function* _deleteArticle(action) {
  try {
    const {id, params} = action.payload
    // 删除文章分类
    yield call(deleteArticle, id);
    message.success("文章删除成功")
    yield _getArticleLists({payload: params})
  } catch (e) {
    console.error(e)
  }
}

function* deleteArticleSaga() {
  yield takeLatest(DELETE_ARTICLE, _deleteArticle);
}

function* _updateArticleStatus(action) {
  try {
    // 编辑文章状态
    const {id, status, params} = action.payload
    yield call(updateArticleStatus, {id, status});
    message.success("修改文章状态成功")
    // 重新获取列表
    yield _getArticleLists({payload: params})
  } catch (e) {
    console.error(e)
  }
}

function* changeArticleStatusSaga() {
  yield takeLatest(CHANGE_ARTICLE_STATUS, _updateArticleStatus);
}

const sagas = {
  getArticleLists,
  getArticleSaga,
  addArticleSaga,
  updateArticleSaga,
  deleteArticleSaga,
  changeArticleStatusSaga
}

export default sagas
