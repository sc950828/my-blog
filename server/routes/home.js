const Router = require("koa-router");
const router = new Router({ prefix: "/home" });
const { tokenTimeVerify } = require("../utils/token");
const { upload, ossUploadImg, ossUploadFile, ossDeleteFile, sendMail, sendUpdatePasswordMail } = require("../controllers/home");


router.post("/upload", tokenTimeVerify, upload);

router.post("/ossUploadImg", tokenTimeVerify, ossUploadImg);

router.post("/ossUploadFile", tokenTimeVerify, ossUploadFile);

router.delete("/ossDeleteFile", tokenTimeVerify, ossDeleteFile);

router.post("/sendMail", tokenTimeVerify, sendMail);

router.post("/sendUpdatePasswordMail", sendUpdatePasswordMail);

module.exports = router;
