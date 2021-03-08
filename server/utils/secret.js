
const { getSetting } = require("./setting");

const initSecret = async () => {
  // 密钥防止泄露 从数据库加载
  return await getSetting("secret");
};

module.exports = {
  initSecret
};
