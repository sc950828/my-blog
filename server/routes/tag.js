const Router = require("koa-router");
const router = new Router({ prefix: "/tags" });
const { tokenTimeVerify } = require("../utils/token");
const { find, findAll, findById, delete: del } = require("../controllers/tag");
const { checkTagIsOwn } = require("../utils/checkIsOwn");


router.get("/", tokenTimeVerify, find);

router.get("/all", findAll);

router.get("/:id", tokenTimeVerify, checkTagIsOwn, findById);

router.delete("/:id", tokenTimeVerify, checkTagIsOwn, del);

module.exports = router;
