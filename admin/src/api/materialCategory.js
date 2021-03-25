import request from "./request";

// 获取素材类别
export const getMaterialCategoryList = (params) => {
  return request({
    url: "/materialCategorys",
    method: "get",
    params
  });
}

// 获取所有素材类别
export const getAllMaterialCategoryList = (params) => {
  return request({
    url: "/materialCategorys/all",
    method: "get",
    params
  });
}


// 添加素材类别
export const addMaterialCategory = (data) => {
  return request({
    url: "/materialCategorys",
    method: "post",
    data
  });
}


// 编辑素材类别
export const updateMaterialCategory = (data) => {
  return request({
    url: `/materialCategorys/${data.id}`,
    method: "put",
    data
  });
}


// 删除素材类别
export const deleteMaterialCategory = (data) => {
  return request({
    url: `/materialCategorys/${data}`,
    method: "delete",
  });
}
