const path = require("path");
const { uploadImg, uploadFile, del } = require("../utils/alioss");
const { sendUpdatePasswordEmail, sendRegisterEmail, sendWebUpdatePasswordEmail } = require("../utils/mail");
const { setAsync, expireAsync } = require("../utils/redis");
const { getRandomCode }  = require('../utils/help');

class HomeCtrl {
  // 上传到本地服务器
  async upload(ctx) {
    const file = ctx.request.files.file;
    const fileName = path.basename(file.path);

    ctx.body = { url: `${ctx.origin}/uploads/${fileName}` };
  }

  // 上传到ali oss
  async ossUploadImg(ctx) {
    // 多个文件都会在files里面 key就是上传文件时候命的名 比如files.file1 files.file2
    const file = ctx.request.files.file;
    const fileName = path.basename(file.path);
    const results = await uploadImg({ fileName, file });

    ctx.body = results;
  }

  // 分段上传到ali oss
  async ossUploadFile(ctx) {
    const file = ctx.request.files.file;

    const fileName = path.basename(file.path);
    const results = await uploadFile({ fileName, file });

    ctx.body = results;
  }

  // 删除ali oss文件 "blog/images/upload_cc7e25eea3cfb6d1b53e9a13b68d9a95.jpg"
  async ossDeleteFile(ctx) {
    const fileName = ctx.query.fileName;
    await del(fileName);

    ctx.status = 204;
  }

  // 博客后台找回密码邮件
  async sendUpdatePasswordMail(ctx) {
    const { email } = ctx.request.body;
    // 四位随机数
    const randomCode = getRandomCode();
    // redis设置randomCode
    await setAsync(email, randomCode);
    // 设置token的过期时间为5分钟
    await expireAsync(email, 60 * 5);
    const option = {
      toUser: email,
      code: randomCode,
    };
    const results = await sendUpdatePasswordEmail(option);
    ctx.body = results;
  }

  // 注册博客邮件
  async sendRegisterMail(ctx) {
    const { email } = ctx.request.body;
    // 四位随机数
    const randomCode = getRandomCode();
    // redis设置randomCode
    await setAsync(email, randomCode);
    // 设置token的过期时间为5分钟
    await expireAsync(email, 60 * 5);
    const option = {
      fromUser: ctx.state.user.nickName,
      toUser: email,
      code: randomCode,
    };
    const results = await sendRegisterEmail(option);
    ctx.body = results;
  }

  // 博客找回密码邮件
  async sendWebUpdatePasswordMail(ctx) {
    const { email } = ctx.request.body;
    // 四位随机数
    const randomCode = getRandomCode();
    // redis设置randomCode
    await setAsync(email, randomCode);
    // 设置token的过期时间为5分钟
    await expireAsync(email, 60 * 5);
    const option = {
      fromUser: ctx.state.user.nickName,
      toUser: email,
      code: randomCode,
    };
    const results = await sendWebUpdatePasswordEmail(option);
    ctx.body = results;
  }
}

module.exports = new HomeCtrl();
