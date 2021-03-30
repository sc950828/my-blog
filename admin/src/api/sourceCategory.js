import request from "./request";

// 获取学习资源类别
export const getSourceCategoryList = (params) => {
  return request({
    url: "/sourceCategorys",
    method: "get",
    params
  });
}

// 获取所有学习资源类别
export const getAllSourceCategoryList = (params) => {
  return request({
    url: "/sourceCategorys/all",
    method: "get",
    params
  });
}


// 添加学习资源类别
export const addSourceCategory = (data) => {
  return request({
    url: "/sourceCategorys",
    method: "post",
    data
  });
}


// 编辑学习资源类别
export const updateSourceCategory = (data) => {
  return request({
    url: `/sourceCategorys/${data.id}`,
    method: "put",
    data
  });
}

// 编辑学习资源分类状态
export const updateSourceCategoryStatus = (data) => {
  return request({
    url: `/sourceCategorys/${data.id}`,
    method: "patch",
    data
  });
}

// 删除学习资源类别
export const deleteSourceCategory = (data) => {
  return request({
    url: `/sourceCategorys/${data}`,
    method: "delete",
  });
}
