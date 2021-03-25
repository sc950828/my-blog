import { call, put, takeLatest } from 'redux-saga/effects'
import { getArticleCategoryList, getAllArticleCategoryList, getArticleCategoryById, addArticleCategory, updateArticleCategory, deleteArticleCategory, updateArticleCategoryStatus} from '../../api/articleCategory'
import {  GET_ARTICLE_CATEGORY_LISTS, GET_ARTICLE_CATEGORY, GET_ALL_ARTICLE_CATEGORY_LISTS, ADD_ARTICLE_CATEGORY, UPDATE_ARTICLE_CATEGORY, DELETE_ARTICLE_CATEGORY, CHANGE_ARTICLE_CATEGORY_STATUS } from '../actionTypes'
import {getArticleCategoryListsSuccessed, getArticleCategoryListsFailed, getArticleCategorySuccessed, getArticleCategoryFailed, getAllArticleCategoryListsSuccessed, getAllArticleCategoryListsFailed} from '../actions/creatorArticleCategoryActions'
import {message} from 'antd'

function* _getArticleCategoryLists(action={}) {
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

function* _getAllArticleCategoryLists() {
  try {
    // 获取分类列表 不分页
    const result = yield call(getAllArticleCategoryList);
    // 进入下一步
    yield put(getAllArticleCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getAllArticleCategoryListsFailed([]));
  }
}

function* getAllArticleCategoryLists() {
  yield takeLatest(GET_ALL_ARTICLE_CATEGORY_LISTS, _getAllArticleCategoryLists);
}

function* _getArticleCategoryById(action) {
  try {
    // 获取分类通过id
    const {setFormData, id} = action.payload
    const result = yield call(getArticleCategoryById, id);
    yield put(getArticleCategorySuccessed(result));
    setFormData()
  } catch (e) {
    console.error(e)
    yield put(getArticleCategoryFailed(null));
  }
}

function* getArticleCategoryByIdSaga() {
  yield takeLatest(GET_ARTICLE_CATEGORY, _getArticleCategoryById);
}

function* _addArticleCategory(action) {
  try {
    const {goArticleCategory, title, description, banner, isPublish} = action.payload
    // 添加文章分类
    yield call(addArticleCategory, {title, description, banner, isPublish});
    message.success("文章分类添加成功")
    // 返回列表
    goArticleCategory()
  } catch (e) {
    console.error(e)
  }
}

function* addArticleCategorySaga() {
  yield takeLatest(ADD_ARTICLE_CATEGORY, _addArticleCategory);
}

function* _updateArticleCategory(action) {
  try {
    const {goArticleCategory, id, title, description, banner, isPublish} = action.payload
    // 编辑文章分类
    yield call(updateArticleCategory, {id, title, description, banner, isPublish});
    message.success("文章分类编辑成功")
    // 返回列表
    goArticleCategory()
  } catch (e) {
    console.error(e)
  }
}

function* updateArticleCategorySaga() {
  yield takeLatest(UPDATE_ARTICLE_CATEGORY, _updateArticleCategory);
}

function* _deleteArticleCategoory(action) {
  try {
    // 删除文章分类
    yield call(deleteArticleCategory, action.payload);
    message.success("文章分类删除成功")
    yield _getArticleCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* deleteArticleCategorySaga() {
  yield takeLatest(DELETE_ARTICLE_CATEGORY, _deleteArticleCategoory);
}

function* _updateArticleCategoryStatus(action) {
  try {
    // 编辑文章分类状态
    const {id, status} = action.payload
    yield call(updateArticleCategoryStatus, {id, status});
    message.success("修改文章分类状态成功")
    // 重新获取列表
    yield _getArticleCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* changeArticleCategoryStatusSaga() {
  yield takeLatest(CHANGE_ARTICLE_CATEGORY_STATUS, _updateArticleCategoryStatus);
}

const sagas = {
  getArticleCategoryLists,
  getAllArticleCategoryLists,
  getArticleCategoryByIdSaga,
  addArticleCategorySaga,
  updateArticleCategorySaga,
  deleteArticleCategorySaga,
  changeArticleCategoryStatusSaga
}

export default sagas
