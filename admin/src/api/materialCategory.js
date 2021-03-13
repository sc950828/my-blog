import request from "./request";

// 获取素材类别
export const getMaterialCategoryList = (params) => {
  return request({
    url: "/materialCategorys",
    method: "get",
    params
  });
}
