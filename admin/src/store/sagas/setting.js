import { call, put, takeLatest } from 'redux-saga/effects'
import { getSettingList, addSetting, deleteSetting, updateSetting} from '../../api/setting'
import {  GET_SETTING_LISTS, ADD_SETTING, UPDATE_SETTING, DELETE_SETTING } from '../actionTypes'
import {getSettingListsSuccessed, getSettingListsFailed} from '../actions/creatorSettingActions'
import { message } from 'antd';

function* _getSettingLists(action = {}) {
  try {
    // 获取设置列表
    const result = yield call(getSettingList, action.payload);
    // 进入下一步
    yield put(getSettingListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getSettingListsFailed([]));
  }
}

function* getSettingListsSaga() {
  yield takeLatest(GET_SETTING_LISTS, _getSettingLists);
}

function* _addSetting(action) {
  try {
    // 添加设置
    yield call(addSetting, action.payload);
    message.success("设置添加成功")
    // 获取设置列表
    yield _getSettingLists()
  } catch (e) {
    console.error(e)
  }
}

function* addSettingListsSaga() {
  yield takeLatest(ADD_SETTING, _addSetting);
}

function* _updateSettingLists(action) {
  try {
    // 更新设置
    yield call(updateSetting, action.payload);
    message.success("设置编辑成功")
    // 获取设置列表
    yield _getSettingLists()
  } catch (e) {
    console.error(e)
  }
}

function* updateSettingListsSaga() {
  yield takeLatest(UPDATE_SETTING, _updateSettingLists);
}

function* _deleteSettingLists(action) {
  try {
    // 删除设置
    yield call(deleteSetting, action.payload);
    message.success("设置删除成功")
    // 获取设置列表
    yield _getSettingLists()
  } catch (e) {
    console.error(e)
  }
}

function* deleteSettingListsSaga() {
  yield takeLatest(DELETE_SETTING, _deleteSettingLists);
}

const sagas = {
  getSettingListsSaga,
  addSettingListsSaga,
  updateSettingListsSaga,
  deleteSettingListsSaga
}

export default sagas
