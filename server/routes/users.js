const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const { tokenTimeVerify } = require("../utils/token");
const { checkIsAdmin } = require("../utils/checkIsOwn");
const {
  find,
  findById,
  create,
  update,
  updateStatus,
  delete: del,
  login,
  logout,
  getUserInfo,
  verifyUpdatePasswordEmailCode,
  updatePassword,
  updatePwdByOldPwd
} = require("../controllers/users");

// 用户管理某些功能只能是超级管理员才能操作

// 获取用户信息列表
router.get("/", tokenTimeVerify, checkIsAdmin, find);

// 不传id获取用户信息
router.get("/web/userInfo", getUserInfo);

// 不传id获取用户信息
router.get("/userInfo", tokenTimeVerify, getUserInfo);

// 通过id获取用户信息
router.get("/:id", tokenTimeVerify, checkIsAdmin, findById);

// 新增用户
router.post("/", tokenTimeVerify, checkIsAdmin, create);

// 修改密码
router.put("/updatePassword", updatePassword);

// 修改密码通过老密码
router.put("/updatePwdByOldPwd", updatePwdByOldPwd);

// 修改用户
router.put("/:id", tokenTimeVerify, update);

// 修改用户状态
router.patch("/:id", tokenTimeVerify, updateStatus);

// 删除用户
router.delete("/:id", tokenTimeVerify, checkIsAdmin, del);

// 登录
router.post("/login", login);

// 退出
router.post("/logout", tokenTimeVerify, logout);

// 验证邮箱验证码
router.post("/verifyUpdatePasswordEmailCode", verifyUpdatePasswordEmailCode);


module.exports = router;
