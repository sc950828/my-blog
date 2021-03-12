import request from "./request";

// 获取分类
export const getArticleList = (params) => {
  return request({
    url: "/articles",
    method: "get",
    params
  });
}
