import { call, put, takeLatest } from 'redux-saga/effects'
import { getSourceCategoryList, getAllSourceCategoryList, addSourceCategory, updateSourceCategory, updateSourceCategoryStatus, deleteSourceCategory} from '../../api/sourceCategory'
import { ADD_SOURCE_CATEGORY, GET_SOURCE_CATEGORY_LISTS, GET_ALL_SOURCE_CATEGORY_LISTS, UPDATE_SOURCE_CATEGORY, DELETE_SOURCE_CATEGORY, CHANGE_SOURCE_CATEGORY_STATUS } from '../actionTypes'
import {getSourceCategoryListsSuccessed, getSourceCategoryListsFailed, getAllSourceCategoryListsSuccessed, getAllSourceCategoryListsFailed} from '../actions/creatorSourceCategoryActions'
import { message } from 'antd';

function* _getSourceCategoryLists(action = {}) {
  try {
    // 获取学习资源分类列表
    const result = yield call(getSourceCategoryList, action.payload);
    // 进入下一步
    yield put(getSourceCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getSourceCategoryListsFailed([]));
  }
}

function* getSourceCategoryListsSaga() {
  yield takeLatest(GET_SOURCE_CATEGORY_LISTS, _getSourceCategoryLists);
}

function* _getAllSourceCategoryLists(action = {}) {
  try {
    // 获取学习资源分类列表
    const result = yield call(getAllSourceCategoryList, action.payload);
    // 进入下一步
    yield put(getAllSourceCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getAllSourceCategoryListsFailed([]));
  }
}

function* getAllSourceCategoryListsSaga() {
  yield takeLatest(GET_ALL_SOURCE_CATEGORY_LISTS, _getAllSourceCategoryLists);
}

function* _addSourceCategory(action) {
  try {
    // 添加学习资源分类
    yield call(addSourceCategory, action.payload);
    message.success("添加学习资源分类成功")
    yield _getSourceCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* addSourceCategorySaga() {
  yield takeLatest(ADD_SOURCE_CATEGORY, _addSourceCategory);
}

function* _updateSourceCategory(action) {
  try {
    // 编辑学习资源分类
    yield call(updateSourceCategory, action.payload);
    message.success("编辑学习资源分类成功")
    yield _getSourceCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* updateSourceCategorySaga() {
  yield takeLatest(UPDATE_SOURCE_CATEGORY, _updateSourceCategory);
}

function* _updateSourceCategoryStatus(action) {
  try {
    // 编辑文章分类状态
    const {id, status} = action.payload
    yield call(updateSourceCategoryStatus, {id, status});
    message.success("修改文章分类状态成功")
    // 重新获取列表
    yield _getSourceCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* changeSourceCategoryStatusSaga() {
  yield takeLatest(CHANGE_SOURCE_CATEGORY_STATUS, _updateSourceCategoryStatus);
}

function* _deleteSourceCategory(action) {
  try {
    // 删除学习资源分类
    yield call(deleteSourceCategory, action.payload);
    message.success("删除学习资源分类成功")
    yield _getSourceCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* deleteSourceCategorySaga() {
  yield takeLatest(DELETE_SOURCE_CATEGORY, _deleteSourceCategory);
}

const sagas = {
  getSourceCategoryListsSaga,
  getAllSourceCategoryListsSaga,
  addSourceCategorySaga,
  updateSourceCategorySaga,
  changeSourceCategoryStatusSaga,
  deleteSourceCategorySaga
}

export default sagas
