import { call, put, takeLatest } from 'redux-saga/effects'
import { getMaterialList} from '../../api/material'
import {  GET_MATERIAL_CATEGORY_LISTS } from '../actionTypes'
import {getMaterialListsSuccessed, getMaterialListsFailed} from '../actions/creatorMaterialActions'

function* _getMaterialLists(action) {
  try {
    // 获取设置列表
    const result = yield call(getMaterialList, action.payload);
    // 进入下一步
    yield put(getMaterialListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getMaterialListsFailed([]));
  }
}

function* getMaterialLists() {
  yield takeLatest(GET_MATERIAL_CATEGORY_LISTS, _getMaterialLists);
}

const sagas = {
  getMaterialLists
}

export default sagas
