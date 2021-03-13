import { call, put, takeLatest } from 'redux-saga/effects'
import { getMaterialCategoryList} from '../../api/materialCategory'
import {  GET_MATERIAL_CATEGORY_LISTS } from '../actionTypes'
import {getMaterialCategoryListsSuccessed, getMaterialCategoryListsFailed} from '../actions/creatorMaterialCategoryActions'

function* _getMaterialCategoryLists(action) {
  try {
    // 获取设置列表
    const result = yield call(getMaterialCategoryList, action.payload);
    // 进入下一步
    yield put(getMaterialCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getMaterialCategoryListsFailed([]));
  }
}

function* getMaterialCategoryLists() {
  yield takeLatest(GET_MATERIAL_CATEGORY_LISTS, _getMaterialCategoryLists);
}

const sagas = {
  getMaterialCategoryLists
}

export default sagas
