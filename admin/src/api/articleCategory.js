import request from "./request";

// 获取分类
export const getArticleCategoryList = (params) => {
  return request({
    url: "/articleCategorys",
    method: "get",
    params
  });
}

// 获取分类 不分页
export const getAllArticleCategoryList = () => {
  return request({
    url: "/articleCategorys/all",
    method: "get",
  });
}

// 获取分类通过id
export const getArticleCategoryById = (id) => {
  return request({
    url: `/articleCategorys/${id}`,
    method: "get"
  });
}

// 添加文章分类
export const addArticleCategory = (data) => {
  return request({
    url: "/articleCategorys",
    method: "post",
    data
  });
}

// 编辑文章分类
export const updateArticleCategory = (data) => {
  return request({
    url: `/articleCategorys/${data.id}`,
    method: "put",
    data
  });
}

// 删除文章分类
export const deleteArticleCategory = (id) => {
  return request({
    url: `/articleCategorys/${id}`,
    method: "delete"
  });
}

// 编辑文章类型状态
export const updateArticleCategoryStatus = (data) => {
  return request({
    url: `/articleCategorys/${data.id}`,
    method: "patch",
    data
  });
}
