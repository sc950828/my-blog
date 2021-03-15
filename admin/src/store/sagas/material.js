import { call, put, takeLatest } from 'redux-saga/effects'
import { getMaterialList, addMaterial, deleteMaterial} from '../../api/material'
import { message } from 'antd';
import { ADD_MATERIAL, GET_MATERIAL_LISTS, DELETE_MATERIAL } from '../actionTypes'
import {getMaterialListsSuccessed, getMaterialListsFailed} from '../actions/creatorMaterialActions'

function* _getMaterialLists(action) {
  try {
    // 获取素材列表
    const result = yield call(getMaterialList, action.payload);
    // 进入下一步
    yield put(getMaterialListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getMaterialListsFailed([]));
  }
}

function* getMaterialLists() {
  yield takeLatest(GET_MATERIAL_LISTS, _getMaterialLists);
}

function* _addMaterial(action) {
  try {
    const {materialCategory, fileList, goMaterial} = action.payload
    // 添加素材
    yield call(addMaterial, {materialCategory, fileList});
    message.success("素材添加成功")
    // 返回素材列表
    goMaterial()
  } catch (e) {
    console.error(e)
  }
}

function* addMaterialSaga() {
  yield takeLatest(ADD_MATERIAL, _addMaterial);
}

function* _deleteMaterial(action) {
  try {
    const {id, params} = action.payload
    // 添加素材
    yield call(deleteMaterial, id);
    message.success("素材删除成功")
    yield _getMaterialLists({payload: params})
  } catch (e) {
    console.error(e)
  }
}

function* deleteMaterialSaga() {
  yield takeLatest(DELETE_MATERIAL, _deleteMaterial);
}

const sagas = {
  getMaterialLists,
  addMaterialSaga,
  deleteMaterialSaga
}

export default sagas
