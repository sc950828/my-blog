const Router = require("koa-router");
const router = new Router({ prefix: "/settings" });
const { tokenTimeVerify } = require("../utils/token");
const { checkIsAdmin } = require("../utils/checkIsOwn");
const {
  find,
  getSetting,
  saveSetting,
  updateSettingById,
  updateSettingByKey,
  deleteById,
  deleteByKey
} = require("../controllers/setting");

// 只有超级管理员才能操作setting
router.get("/", tokenTimeVerify, checkIsAdmin, find);

router.get("/:key", tokenTimeVerify, checkIsAdmin, getSetting);

router.post("/", tokenTimeVerify, checkIsAdmin, saveSetting);

router.put("/:id", tokenTimeVerify, checkIsAdmin, updateSettingById);

router.put("/", tokenTimeVerify, checkIsAdmin, updateSettingByKey);

router.delete("/:id", tokenTimeVerify, checkIsAdmin, deleteById);

router.delete("/", tokenTimeVerify, checkIsAdmin, deleteByKey);

module.exports = router;
