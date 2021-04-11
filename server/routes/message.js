const Router = require("koa-router");
const router = new Router({ prefix: "/messages" });
// const { tokenTimeVerify } = require("../utils/token");
const { create, findWeb } = require("../controllers/message");
// const { checkSourceIsOwn } = require("../utils/checkIsOwn");

// web端接口

router.get("/web", findWeb);

router.post("/", create);

module.exports = router;
