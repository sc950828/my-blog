const Router = require("koa-router");
const router = new Router({ prefix: "/articleCategorys" });
const { tokenTimeVerify } = require("../utils/token");
const {
  find,
  findById,
  create,
  update,
  delete: del,
} = require("../controllers/articleCategory");
const { checkArticleCategoryIsOwn } = require("../utils/checkIsOwn");


router.get("/web", find);

router.get("/", tokenTimeVerify, find);

router.get("/:id", tokenTimeVerify, checkArticleCategoryIsOwn, findById);

router.post("/", tokenTimeVerify, create);

router.put("/:id", tokenTimeVerify, checkArticleCategoryIsOwn, update);

router.delete("/:id", tokenTimeVerify, checkArticleCategoryIsOwn, del);

module.exports = router;
