import request from "./request";

// 获取分类
export const getCategoryList = (params) => {
  return request({
    url: "/categorys",
    method: "get",
    params
  });
}
