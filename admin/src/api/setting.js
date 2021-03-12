import request from "./request";

// 获取设置
export const getSettingList = (params) => {
  return request({
    url: "/settings",
    method: "get",
    params
  });
}
