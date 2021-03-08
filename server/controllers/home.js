const path = require("path");
const { uploadImg, uploadFile, del } = require("../utils/alioss");
const { sendEmail } = require("../utils/mail");

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

  // 发邮件
  async sendMail(ctx) {
    const option = {
      fromUser: "晏海燕",
      toUser: "chun.su@simq.org.cn",
      subject: "标题",
      text: "内容"
    };
    const results = await sendEmail(option);
    ctx.body = results;
  }
}

module.exports = new HomeCtrl();
