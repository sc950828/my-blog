const Router = require("koa-router");
const router = new Router({ prefix: "/categorys" });
const { tokenTimeVerify } = require("../utils/token");
const {
  find,
  findById,
  create,
  update,
  delete: del,
} = require("../controllers/category");
const { checkCategoryIsOwn } = require("../utils/checkIsOwn");


router.get("/web", find);

router.get("/", tokenTimeVerify, find);

router.get("/:id", tokenTimeVerify, checkCategoryIsOwn, findById);

router.post("/", tokenTimeVerify, create);

router.put("/:id", tokenTimeVerify, checkCategoryIsOwn, update);

router.delete("/:id", tokenTimeVerify, checkCategoryIsOwn, del);

module.exports = router;
