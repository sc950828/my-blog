const Router = require("koa-router");
const router = new Router({ prefix: "/materials" });
const { tokenTimeVerify } = require("../utils/token");
const { find, findById, create, delete: del } = require("../controllers/material");
const { checkMaterialIsOwn } = require("../utils/checkIsOwn");

router.get("/", tokenTimeVerify, find);

router.get("/:id", tokenTimeVerify, checkMaterialIsOwn, findById);

router.post("/", tokenTimeVerify, create);

router.delete("/:id", tokenTimeVerify, checkMaterialIsOwn, del);

module.exports = router;
