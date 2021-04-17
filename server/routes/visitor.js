const Router = require("koa-router");
const router = new Router({ prefix: "/visitors" });
const { find, findById, delete: del, create, login, forgetPassword } = require("../controllers/visitor");
const { checkVisitorIsOwn } = require("../utils/checkIsOwn");
const { tokenTimeVerify } = require("../utils/token");


router.get("/", tokenTimeVerify, find);

router.get("/:id", tokenTimeVerify, checkVisitorIsOwn, findById);

router.post("/login", login);

router.post("/forgetPassword", forgetPassword);

router.post("/", create);

router.delete("/:id", tokenTimeVerify, checkVisitorIsOwn, del);

module.exports = router;
