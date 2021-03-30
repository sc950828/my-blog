const Router = require("koa-router");
const router = new Router({ prefix: "/sources" });
const { tokenTimeVerify } = require("../utils/token");
const { find, findWeb, findById, update, create, delete: del, updateStatus } = require("../controllers/source");
const { checkSourceIsOwn } = require("../utils/checkIsOwn");

// web端接口
// 分页获取所有资源
router.get("/web", findWeb);

router.get("/", tokenTimeVerify, find);

router.get("/:id", tokenTimeVerify, checkSourceIsOwn, findById);

router.post("/", tokenTimeVerify, create);

// 修改学习资源状态
router.patch("/:id", tokenTimeVerify, checkSourceIsOwn, updateStatus);

router.put("/:id", tokenTimeVerify, checkSourceIsOwn, update);

router.delete("/:id", tokenTimeVerify, checkSourceIsOwn, del);

module.exports = router;
