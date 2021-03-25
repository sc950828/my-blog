import request from "./request";

// 获取文章
export const getArticleList = (params) => {
  return request({
    url: "/articles",
    method: "get",
    params
  });
}

// 获取文章
export const getArticle = (id) => {
  return request({
    url: `/articles/${id}`,
    method: "get"
  });
}

// 添加文章
export const addArticle = (data) => {
  return request({
    url: "/articles",
    method: "post",
    data
  });
}

// 编辑文章
export const updateArticle = (data) => {
  return request({
    url: `/articles/${data.id}`,
    method: "put",
    data
  });
}

// 删除文章
export const deleteArticle = (id) => {
  return request({
    url: `/articles/${id}`,
    method: "delete"
  });
}

// 编辑文章状态
export const updateArticleStatus = (data) => {
  return request({
    url: `/articles/${data.id}`,
    method: "patch",
    data
  });
}
