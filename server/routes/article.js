const Router = require("koa-router");
const router = new Router({ prefix: "/articles" });
const { tokenTimeVerify } = require("../utils/token");
const {
  find,
  findById,
  create,
  update,
  delete: del,
} = require("../controllers/article");
const { checkArticleIsOwn } = require("../utils/checkIsOwn");


router.get("/web", find);

router.get("/", tokenTimeVerify, find);

router.get("/:id", tokenTimeVerify, checkArticleIsOwn, findById);

router.post("/", tokenTimeVerify, create);

router.put("/:id", tokenTimeVerify, checkArticleIsOwn, update);

router.delete("/:id", tokenTimeVerify, checkArticleIsOwn, del);

module.exports = router;
