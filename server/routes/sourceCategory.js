const Router = require("koa-router");
const router = new Router({ prefix: "/sourceCategorys" });
const { tokenTimeVerify } = require("../utils/token");
const { find, findAll, update, create, delete: del, updateStatus } = require("../controllers/sourceCategory");
const { checkSourceCategoryIsOwn } = require("../utils/checkIsOwn");


// 获取所有学习资源分类 不分页
router.get("/all", tokenTimeVerify, findAll);

// 分页获取学习资源分类
router.get("/", tokenTimeVerify, find);

// 添加学习资源分类
router.post("/", tokenTimeVerify, create);

// 修改学习资源分类状态
router.patch("/:id", tokenTimeVerify, checkSourceCategoryIsOwn, updateStatus);

// 修改学习资源分类
router.put("/:id", tokenTimeVerify, checkSourceCategoryIsOwn, update);

// 删除学习资源分类
router.delete("/:id", tokenTimeVerify, checkSourceCategoryIsOwn, del);

module.exports = router;
