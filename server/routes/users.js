const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const { tokenTimeVerify } = require("../utils/token");
const { checkIsAdmin } = require("../utils/checkIsOwn");
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
  logout,
  getUserInfo,
} = require("../controllers/users");

// 用户管理某些功能只能是超级管理员才能操作
router.get("/", tokenTimeVerify, checkIsAdmin, find);

router.get("/userInfo", getUserInfo);

router.get("/:id", tokenTimeVerify, checkIsAdmin, findById);

router.post("/create", tokenTimeVerify, checkIsAdmin, create);

router.put("/:id", tokenTimeVerify, update);

router.delete("/:id", tokenTimeVerify, checkIsAdmin, del);

router.post("/login", login);

router.post("/logout", tokenTimeVerify, logout);

module.exports = router;
