const Router = require("koa-router");
const router = new Router({ prefix: "/materialCategorys" });
const { tokenTimeVerify } = require("../utils/token");
const { find, update, create, delete: del } = require("../controllers/materialCategory");
const { checkMaterialCategoryIsOwn } = require("../utils/checkIsOwn");

router.get("/", tokenTimeVerify, find);

router.post("/", tokenTimeVerify, create);

router.put("/", tokenTimeVerify, checkMaterialCategoryIsOwn, update);

router.delete("/:id", tokenTimeVerify, checkMaterialCategoryIsOwn, del);

module.exports = router;
