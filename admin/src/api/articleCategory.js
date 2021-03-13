import request from "./request";

// 获取分类
export const getArticleCategoryList = (params) => {
  return request({
    url: "/articleCategorys",
    method: "get",
    params
  });
}
