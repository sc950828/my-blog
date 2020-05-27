import axios from "axios";
import { takeLatest, put, call } from "redux-saga/effects";

function* getList() {
  yield takeLatest("GET_DATA_BY_SAGA", featList);
}

function* featList(action) {
  const { data } = yield call(getDataApi, action);
  console.log(data)
  yield put({ type: "getListBySaga", data: data });
}

function getDataApi(action) {
  return axios.get(
    "http://jsonplaceholder.typicode.com/posts" + `/${action.payload.id}`
  );
}

export default getList
