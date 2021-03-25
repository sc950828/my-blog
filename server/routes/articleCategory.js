const Router = require("koa-router");
const router = new Router({ prefix: "/articleCategorys" });
const { tokenTimeVerify } = require("../utils/token");
const {
  findWeb,
  find,
  findAll,
  findById,
  create,
  update,
  updateStatus,
  delete: del,
} = require("../controllers/articleCategory");
const { checkArticleCategoryIsOwn } = require("../utils/checkIsOwn");

// web端接口
// 分页查询所有文章分类 不验证token时间
router.get("/web", findWeb);

// admin端接口
// 不分页查询
router.get("/all", tokenTimeVerify, findAll);
// 分页查询
router.get("/", tokenTimeVerify, find);
// 通过id获取
router.get("/:id", tokenTimeVerify, checkArticleCategoryIsOwn, findById);
// 新增
router.post("/", tokenTimeVerify, create);
// 修改文章分类状态
router.patch("/:id", tokenTimeVerify, checkArticleCategoryIsOwn, updateStatus);
// 修改
router.put("/:id", tokenTimeVerify, checkArticleCategoryIsOwn, update);
// 删除
router.delete("/:id", tokenTimeVerify, checkArticleCategoryIsOwn, del);

module.exports = router;
