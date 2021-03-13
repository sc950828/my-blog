const Router = require("koa-router");
const router = new Router({ prefix: "/projects" });
const { tokenTimeVerify } = require("../utils/token");
const { find, update, create, delete: del } = require("../controllers/project");
const { checkProjectlIsOwn } = require("../utils/checkIsOwn");

router.get("/", tokenTimeVerify, find);

router.put("/:id", tokenTimeVerify, checkProjectlIsOwn, update);

router.post("/", tokenTimeVerify, create);

router.delete("/:id", tokenTimeVerify, checkProjectlIsOwn, del);

module.exports = router;
