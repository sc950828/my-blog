const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  res.send("user 我是拆分出来的路由");
});

module.exports = router;
