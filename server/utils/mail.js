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



const sendEmail = async (option) => {
  const { fromUser, toUser, subject, text } = option;
  return await transporter.sendMail({
    from: `${fromUser}的博客 ${mailUser}`, // sender address
    to: toUser, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
};


module.exports = {
  sendEmail
};
