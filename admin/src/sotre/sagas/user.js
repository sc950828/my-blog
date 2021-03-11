import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd';
import { login, getUserInfo, sendUpdatePasswordEmail, verifyCode, updatePassword } from '../../api/user'
import { LOGIN, SEND_UPDATE_PASSWORD_EMAIL, VERIFY_UPDATE_PASSWORD_CODE, CHANGE_PASSWORD } from '../actionTypes'
import {loginSuccessed, loginFailed,sendUpdatePasswordEmailSuccessed, sendUpdatePasswordEmailFailed, changeStepAction} from '../actions/creatorUserActions'

function* _userLogin(action) {
  try {
    const {name, password, remember, goHome} = action.payload
    // 获取token
    const {token} = yield call(login, {name, password, remember});
    // 缓存token
    localStorage.setItem("token", token)
    // 获取用户信息
    const user = yield call(getUserInfo);
    yield put(loginSuccessed(user));
    message.success("登录成功")
    // 去首页
    goHome()
  } catch (e) {
    console.error(e)
    yield put(loginFailed(null));
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN, _userLogin);
}

function* _sendEmail(action) {
  try {
    // 发送邮件
    yield call(sendUpdatePasswordEmail, action.payload);
    // 进入下一步
    yield put(changeStepAction(1));
    yield put(sendUpdatePasswordEmailSuccessed(action.payload.email));
    message.success("邮件发送成功")
  } catch (e) {
    console.error(e)
    yield put(sendUpdatePasswordEmailFailed(""));
  }
}

function* sendEmailSaga() {
  yield takeLatest(SEND_UPDATE_PASSWORD_EMAIL, _sendEmail);
}

function* _verifyCode(action) {
  try {
    // 验证code
    yield call(verifyCode, action.payload);
    // 进入下一步
    yield put(changeStepAction(2));
    message.success("验证码验证成功")
  } catch (e) {
    console.error(e)
  }
}

function* verifyEmailCode() {
  yield takeLatest(VERIFY_UPDATE_PASSWORD_CODE, _verifyCode);
}

function* _changePassword(action) {
  try {
    // 修改密码
    const {email, password, goLogin} = action.payload
    yield call(updatePassword, {email, password});
    message.success("密码修改成功")
    // 返回登录页
    goLogin()
  } catch (e) {
    console.error(e)
  }
}

function* changePassword() {
  yield takeLatest(CHANGE_PASSWORD, _changePassword);
}

const sagas = {
  loginSaga,
  sendEmailSaga,
  verifyEmailCode,
  changePassword
}

export default sagas
