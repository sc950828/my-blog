import request from "./request";

// 获取素材
export const getMaterialList = (params) => {
  return request({
    url: "/materials",
    method: "get",
    params
  });
}
