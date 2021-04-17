const nodemailer = require('nodemailer');
const { getSetting } = require("./setting");

let transporter = null;
let mailUser = "";

const initMail = async () => {
  mailUser = await getSetting("mailUser");
  const mailPass = await getSetting("mailPass");

  transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    // 密钥防止泄露 从数据库加载
      user: mailUser, // generated ethereal user
      pass: mailPass, // generated ethereal password
    },
  });
};

initMail();

const sendUpdatePasswordEmail = async (option) => {
  const { toUser, code } = option;
  return await transporter.sendMail({
    from: `博客后台管理系统 ${mailUser}`, // sender address
    to: toUser, // list of receivers
    subject: "找回密码", // Subject line
    text: `您的验证码是 ${code}，五分钟内有效。`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
};

// 发送注册验证码
const sendRegisterEmail = async (option) => {
  const { fromUser, toUser, code } = option;
  return await transporter.sendMail({
    from: `${fromUser}的博客 ${mailUser}`, // sender address
    to: toUser, // list of receivers
    subject: "博客注册", // Subject line
    text: `您的验证码是 ${code}，五分钟内有效。`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
};

const sendWebUpdatePasswordEmail = async (option) => {
  const { fromUser, toUser, code } = option;
  return await transporter.sendMail({
    from: `${fromUser}的博客 ${mailUser}`, // sender address
    to: toUser, // list of receivers
    subject: "找回密码", // Subject line
    text: `您的验证码是 ${code}，五分钟内有效。`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
};

module.exports = {
  sendUpdatePasswordEmail,
  sendRegisterEmail,
  sendWebUpdatePasswordEmail
};
