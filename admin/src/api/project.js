import request from "./request";

// 获取项目
export const getProjectList = (params) => {
  return request({
    url: "/projects",
    method: "get",
    params
  });
}
