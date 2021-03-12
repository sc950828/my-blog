import { call, put, takeLatest } from 'redux-saga/effects'
import { getSettingList} from '../../api/setting'
import {  GET_SETTING_LISTS } from '../actionTypes'
import {getSettingListsSuccessed, getSettingListsFailed} from '../actions/creatorSettingActions'

function* _getSettingLists(action) {
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

function* getSettingLists() {
  yield takeLatest(GET_SETTING_LISTS, _getSettingLists);
}

const sagas = {
  getSettingLists
}

export default sagas
