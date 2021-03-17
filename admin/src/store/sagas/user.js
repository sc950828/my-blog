import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd';
import { login, getUserInfo, sendUpdatePasswordEmail, verifyCode, updatePassword, getUserList, deleteUser, addUser, updateUser, getUserInfoById } from '../../api/user'
import { LOGIN, SEND_UPDATE_PASSWORD_EMAIL, VERIFY_UPDATE_PASSWORD_CODE, CHANGE_PASSWORD, GET_USER_LISTS, GET_USER_INFO, DELETE_USER, ADD_USER, UPDATE_USER, GET_USER_INFO_BY_ID } from '../actionTypes'
import {loginSuccessed, loginFailed, sendUpdatePasswordEmailSuccessed, sendUpdatePasswordEmailFailed, changeStepAction, getUserListsSuccessed, getUserListsFailed, getUserInfoByIdSuccessed, getUserInfoByIdFailed} from '../actions/creatorUserActions'

function* _userLogin(action) {
  try {
    const {name, password, remember, goHome} = action.payload
    // 获取token
    const {token} = yield call(login, {name, password, remember});
    // 缓存token
    localStorage.setItem("token", token)
    // 获取用户信息
    yield _userInfo()
    message.success("登录成功")
    // 去首页
    goHome()
  } catch (e) {
    console.error(e)
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN, _userLogin);
}

function* _userInfo() {
  try {
    // 获取用户信息
    const user = yield call(getUserInfo);
    // 获取用户信息
    yield put(loginSuccessed(user));
  } catch (e) {
    console.error(e)
    yield put(loginFailed(null));
  }
}

function* userInfoSaga() {
  yield takeLatest(GET_USER_INFO, _userInfo);
}

function* _userInfoById(action) {
  try {
    const {id, setFormData} = action.payload
    // 获取用户信息
    const user = yield call(getUserInfoById, id);
    yield put(getUserInfoByIdSuccessed(user));
    setFormData()
  } catch (e) {
    console.error(e)
    yield put(getUserInfoByIdFailed(null));
  }
}

function* userInfoByIdSaga() {
  yield takeLatest(GET_USER_INFO_BY_ID, _userInfoById);
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

function* _getUserLists(action) {
  try {
    // 获取用户列表
    const result = yield call(getUserList, action.payload);
    yield put(getUserListsSuccessed(result));
  } catch (e) {
    console.error(e)
    yield put(getUserListsFailed([]));
  }
}

function* getUserLists() {
  yield takeLatest(GET_USER_LISTS, _getUserLists);
}

function* _deleteUser(action) {
  try {
    // 删除用户
    yield call(deleteUser, action.payload);
    message.success("用户删除成功")
    // 再次获取用户数据
    yield _getUserLists({})
  } catch (e) {
    console.error(e)
  }
}

function* deleteUserSaga() {
  yield takeLatest(DELETE_USER, _deleteUser);
}

function* _addUser(action) {
  try {
    // 添加用户
    const {goUserList, name, nickName, password, email, gender} = action.payload
    yield call(addUser, {name, nickName, password, email, gender});
    message.success("添加用户成功")
    // 返回列表
    goUserList()
  } catch (e) {
    console.error(e)
  }
}

function* addUserSaga() {
  yield takeLatest(ADD_USER, _addUser);
}

function* _updateUser(action) {
  try {
    // 编辑用户
    const {goUserList, id, name, nickName, password, email, gender} = action.payload
    yield call(updateUser, {id, name, nickName, password, email, gender});
    message.success("编辑用户成功")
    // 返回列表
    goUserList()
  } catch (e) {
    console.error(e)
  }
}

function* updateUserSaga() {
  yield takeLatest(UPDATE_USER, _updateUser);
}

const sagas = {
  loginSaga,
  userInfoSaga,
  userInfoByIdSaga,
  sendEmailSaga,
  verifyEmailCode,
  changePassword,
  getUserLists,
  deleteUserSaga,
  addUserSaga,
  updateUserSaga,
}

export default sagas
