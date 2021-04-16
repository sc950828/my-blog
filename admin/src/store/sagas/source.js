import { call, put, takeLatest } from 'redux-saga/effects'
import { getSourceList, addSource, deleteSource, getSource, updateSource, updateSourceStatus} from '../../api/source'
import { message } from 'antd';
import { ADD_SOURCE, GET_SOURCE_LISTS, DELETE_SOURCE, UPDATE_SOURCE, CHANGE_SOURCE_STATUS, GET_SOURCE } from '../actionTypes'
import {getSourceListsSuccessed, getSourceListsFailed, getSourceSuccessed, getSourceFailed} from '../actions/creatorSourceActions'

function* _getSourceLists(action={}) {
  try {
    // 获取学习资源列表
    const result = yield call(getSourceList, action.payload);
    // 进入下一步
    yield put(getSourceListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getSourceListsFailed([]));
  }
}

function* getSourceLists() {
  yield takeLatest(GET_SOURCE_LISTS, _getSourceLists);
}

function* _addSource(action) {
  try {
    const {sourceCategory, title, logo, link, description, isPublish, goSource} = action.payload
    // 添加学习资源
    yield call(addSource, {sourceCategory, title, logo, link, description, isPublish});
    message.success("学习资源添加成功")
    // 返回学习资源列表
    goSource()
  } catch (e) {
    console.error(e)
  }
}

function* addSourceSaga() {
  yield takeLatest(ADD_SOURCE, _addSource);
}

function* _getSourceById(action) {
  try {
    // 获取文章通过id
    const {setFormData, id} = action.payload
    const result = yield call(getSource, id);
    yield put(getSourceSuccessed(result));
    setFormData()
  } catch (e) {
    console.error(e)
    yield put(getSourceFailed(null));
  }
}

function* getSourceSaga() {
  yield takeLatest(GET_SOURCE, _getSourceById);
}

function* _deleteSource(action) {
  try {
    const {id, params} = action.payload
    // 添加学习资源
    yield call(deleteSource, id);
    message.success("学习资源删除成功")
    yield _getSourceLists({payload: params})
  } catch (e) {
    console.error(e)
  }
}

function* deleteSourceSaga() {
  yield takeLatest(DELETE_SOURCE, _deleteSource);
}

function* _updateSource(action) {
  try {
    const {id, sourceCategory, title, logo, link, description, isPublish, goSource} = action.payload
    // 编辑学习资源
    yield call(updateSource, {id, sourceCategory, title, logo, link, description, isPublish, goSource});
    message.success("学习资源更新成功")
    // 返回学习资源列表
    goSource()
  } catch (e) {
    console.error(e)
  }
}

function* updateSourceSaga() {
  yield takeLatest(UPDATE_SOURCE, _updateSource);
}

function* _updateSourceStatus(action) {
  try {
    // 编辑文章分类状态
    const {id, status, params} = action.payload
    yield call(updateSourceStatus, {id, status});
    message.success("修改学习资源状态成功")
    // 重新获取列表
    yield _getSourceLists({payload: params})
  } catch (e) {
    console.error(e)
  }
}

function* changeSourceStatusSaga() {
  yield takeLatest(CHANGE_SOURCE_STATUS, _updateSourceStatus);
}

const sagas = {
  getSourceLists,
  getSourceSaga,
  addSourceSaga,
  deleteSourceSaga,
  changeSourceStatusSaga,
  updateSourceSaga
}

export default sagas
