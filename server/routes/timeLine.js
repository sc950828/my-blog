const Router = require("koa-router");
const router = new Router({ prefix: "/timelines" });
const {
  findWeb
} = require("../controllers/timeLine");

// web端接口
// 查找所有
router.get("/web", findWeb);

module.exports = router;
