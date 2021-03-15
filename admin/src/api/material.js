import request from "./request";

// 获取素材
export const getMaterialList = (params) => {
  return request({
    url: "/materials",
    method: "get",
    params
  });
}

// 添加素材
export const addMaterial = (data) => {
  return request({
    url: "/materials",
    method: "post",
    data
  });
}

// 编辑素材
export const updateMaterial = (data) => {
  return request({
    url: `/materials/${data.id}`,
    method: "put",
    data
  });
}

// 删除素材
export const deleteMaterial = (id) => {
  return request({
    url: `/materials/${id}`,
    method: "delete"
  });
}
