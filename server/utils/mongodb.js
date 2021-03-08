const mongoose = require("mongoose");

module.exports = () => {
  // 数据库连接
  return new Promise((resolve, reject) => {
    mongoose
      .connect("mongodb://localhost/blog", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("mongodb数据库连接成功");
        resolve();
      })
      .catch(() => {
        console.log("mongodb数据库连接失败");
        reject();
      });
  });
};
