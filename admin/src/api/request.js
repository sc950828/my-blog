import axios from "axios";
import { message } from 'antd';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: "/api",
  timeout: 60000 // 请求超时时间
});

// 异常处理器
const errorHandler = async error => {
  if (error.response) {
    const {data: {message: errorMessage="", status=""}} = error.response
    if(status === 401) {
      await message.error("登录已过期，请重新登录")
      window.location = "/login"
    } else {
      message.error(`${status} ${errorMessage}`)
    }
  }
  console.error(error.response)
  return Promise.reject(error.response);
};

// 请求拦截
request.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  // config obj
  // adapter: ƒ xhrAdapter(config)
  // baseURL: "/api"
  // data: undefined
  // headers: {Accept: "application/json, text/plain, */*"}
  // maxContentLength: -1
  // method: "get"
  // params: {__ob__: Observer}
  // timeout: 5000
  // transformRequest: [ƒ]
  // transformResponse: [ƒ]
  // url: "/oauth/token"
  // validateStatus: ƒ validateStatus(status)
  // xsrfCookieName: "XSRF-TOKEN"
  // xsrfHeaderName: "X-XSRF-TOKEN"
  if(token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}, errorHandler);

// 响应拦截
request.interceptors.response.use(response => {
  return response.data;
}, errorHandler);



export default request;
