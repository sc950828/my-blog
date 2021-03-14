import { call, put, takeLatest } from 'redux-saga/effects'
import { getMaterialCategoryList, getAllMaterialCategoryList, addMaterialCategory, updateMaterialCategory, deleteMaterialCategory} from '../../api/materialCategory'
import {  ADD_MATERIAL_CATEGORY, GET_MATERIAL_CATEGORY_LISTS, GET_ALL_MATERIAL_CATEGORY_LISTS, UPDATE_MATERIAL_CATEGORY, DELETE_MATERIAL_CATEGORY } from '../actionTypes'
import {getMaterialCategoryListsSuccessed, getMaterialCategoryListsFailed, getAllMaterialCategoryListsSuccessed, getAllMaterialCategoryListsFailed} from '../actions/creatorMaterialCategoryActions'
import { message } from 'antd';

function* _getMaterialCategoryLists(action = {}) {
  try {
    // 获取素材分类列表
    const result = yield call(getMaterialCategoryList, action.payload);
    // 进入下一步
    yield put(getMaterialCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getMaterialCategoryListsFailed([]));
  }
}

function* getMaterialCategoryListsSaga() {
  yield takeLatest(GET_MATERIAL_CATEGORY_LISTS, _getMaterialCategoryLists);
}

function* _getAllMaterialCategoryLists(action = {}) {
  try {
    // 获取素材分类列表
    const result = yield call(getAllMaterialCategoryList, action.payload);
    // 进入下一步
    yield put(getAllMaterialCategoryListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getAllMaterialCategoryListsFailed([]));
  }
}

function* getAllMaterialCategoryListsSaga() {
  yield takeLatest(GET_ALL_MATERIAL_CATEGORY_LISTS, _getAllMaterialCategoryLists);
}

function* _addMaterialCategory(action) {
  try {
    // 添加素材分类
    yield call(addMaterialCategory, action.payload);
    message.success("添加素材分类成功")
    yield _getMaterialCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* addMaterialCategorySaga() {
  yield takeLatest(ADD_MATERIAL_CATEGORY, _addMaterialCategory);
}

function* _updateMaterialCategory(action) {
  try {
    // 编辑素材分类
    yield call(updateMaterialCategory, action.payload);
    message.success("编辑素材分类成功")
    yield _getMaterialCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* updateMaterialCategorySaga() {
  yield takeLatest(UPDATE_MATERIAL_CATEGORY, _updateMaterialCategory);
}

function* _deleteMaterialCategory(action) {
  try {
    // 删除素材分类
    yield call(deleteMaterialCategory, action.payload);
    message.success("删除素材分类成功")
    yield _getMaterialCategoryLists()
  } catch (e) {
    console.error(e)
  }
}

function* deleteMaterialCategorySaga() {
  yield takeLatest(DELETE_MATERIAL_CATEGORY, _deleteMaterialCategory);
}

const sagas = {
  getMaterialCategoryListsSaga,
  getAllMaterialCategoryListsSaga,
  addMaterialCategorySaga,
  updateMaterialCategorySaga,
  deleteMaterialCategorySaga
}

export default sagas
