const Router = require("koa-router");
const router = new Router({ prefix: "/materialCategorys" });
const { tokenTimeVerify } = require("../utils/token");
const { find, findAll, update, create, delete: del } = require("../controllers/materialCategory");
const { checkMaterialCategoryIsOwn } = require("../utils/checkIsOwn");

// 获取所有素材文件夹 不分页
router.get("/all", tokenTimeVerify, findAll);

// 分页获取素材文件夹
router.get("/", tokenTimeVerify, find);

// 添加素材文件夹
router.post("/", tokenTimeVerify, create);

// 修改素材文件夹
router.put("/:id", tokenTimeVerify, checkMaterialCategoryIsOwn, update);

// 删除素材文件夹
router.delete("/:id", tokenTimeVerify, checkMaterialCategoryIsOwn, del);

module.exports = router;
