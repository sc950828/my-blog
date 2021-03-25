const Router = require("koa-router");
const router = new Router({ prefix: "/articles" });
const { tokenTimeVerify } = require("../utils/token");
const {
  findWeb,
  findByIdToWeb,
  find,
  findById,
  create,
  update,
  updateStatus,
  delete: del,
} = require("../controllers/article");
const { checkArticleIsOwn } = require("../utils/checkIsOwn");

// web端接口
// 分页获取所有文章
router.get("/web", findWeb);
// 通过id查找文章
router.get("/web/:id", findByIdToWeb);

// admin端接口
// 分页获取所有文章
router.get("/", tokenTimeVerify, find);
// 通过id查找文章
router.get("/:id", tokenTimeVerify, checkArticleIsOwn, findById);
// 添加文章
router.post("/", tokenTimeVerify, create);
// 修改文章
router.put("/:id", tokenTimeVerify, checkArticleIsOwn, update);
// 修改文章状态
router.patch("/:id", tokenTimeVerify, updateStatus);
// 删除文章
router.delete("/:id", tokenTimeVerify, checkArticleIsOwn, del);

module.exports = router;
