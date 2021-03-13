import { call, put, takeLatest } from 'redux-saga/effects'
import { getProjectList} from '../../api/project'
import {  GET_PROJECT_LISTS } from '../actionTypes'
import {getProjectListsSuccessed, getProjectListsFailed} from '../actions/creatorProjectActions'

function* _getProjectLists(action) {
  try {
    // 获取项目列表
    const result = yield call(getProjectList, action.payload);
    // 进入下一步
    yield put(getProjectListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getProjectListsFailed([]));
  }
}

function* getProjectLists() {
  yield takeLatest(GET_PROJECT_LISTS, _getProjectLists);
}

const sagas = {
  getProjectLists
}

export default sagas
