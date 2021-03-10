import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd';
import { login, getUserInfo, sendEmail } from '../../api/user'
import { LOGIN, SEND_EMAIL } from '../actionTypes'
import {loginSuccessed, loginFailed} from '../actions/creatorUserActions'

function* userLogin(action) {
  try {
    // 获取token
    const {token} = yield call(login, action.payload);
    // 缓存token
    localStorage.setItem("token", token)
    // 获取用户信息
    const user = yield call(getUserInfo);
    yield put(loginSuccessed(user));
    message.success("登录成功")
  } catch (e) {
    console.error(e)
    yield put(loginFailed(null));
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN, userLogin);
}

function* sendEmailSaga() {
  yield takeLatest(SEND_EMAIL, sendEmail);
}

export default loginSaga
