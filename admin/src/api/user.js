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
export const sendEmail = () => {
  return request({
    url: "/users/userInfo",
    method: "post"
  });
}
