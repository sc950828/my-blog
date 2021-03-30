import request from "./request";

// 获取学习资源
export const getSourceList = (params) => {
  return request({
    url: "/sources",
    method: "get",
    params
  });
}

// 获取文章
export const getSource = (id) => {
  return request({
    url: `/sources/${id}`,
    method: "get"
  });
}

// 添加学习资源
export const addSource = (data) => {
  return request({
    url: "/sources",
    method: "post",
    data
  });
}

// 编辑学习资源
export const updateSource = (data) => {
  return request({
    url: `/sources/${data.id}`,
    method: "put",
    data
  });
}

// 编辑学习资源状态
export const updateSourceStatus = (data) => {
  return request({
    url: `/sources/${data.id}`,
    method: "patch",
    data
  });
}

// 删除学习资源
export const deleteSource = (id) => {
  return request({
    url: `/sources/${id}`,
    method: "delete"
  });
}
