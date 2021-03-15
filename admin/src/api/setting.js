import request from "./request";

// 获取设置
export const getSettingList = (params) => {
  return request({
    url: "/settings",
    method: "get",
    params
  });
}

// 添加设置
export const addSetting = (data) => {
  return request({
    url: "/settings",
    method: "post",
    data
  });
}


// 编辑设置
export const updateSetting = (data) => {
  return request({
    url: `/settings/${data.id}`,
    method: "put",
    data
  });
}


// 删除设置
export const deleteSetting = (data) => {
  return request({
    url: `/settings/${data}`,
    method: "delete",
  });
}
