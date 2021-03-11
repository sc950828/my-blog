import request from "./request";

// 登录
export const login = (data) => {
  return request({
    url: "/users/login",
    method: "post",
    data
  });
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: "/users/userInfo",
    method: "get"
  });
}

// 发送邮件
export const sendUpdatePasswordEmail = (data) => {
  return request({
    url: "/home/sendUpdatePasswordMail",
    method: "post",
    data
  });
}

// 验证验证码
export const verifyCode = (data) => {
  return request({
    url: "/users/verifyUpdatePasswordEmailCode",
    method: "post",
    data
  });
}

// 验证验证码
export const updatePassword = (data) => {
  return request({
    url: "/users/updatePassword",
    method: "put",
    data
  });
}
