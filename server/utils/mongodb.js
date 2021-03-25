const mongoose = require("mongoose");

module.exports = () => {
  // 数据库连接
  return new Promise((resolve, reject) => {
    // docker 部署
    let url = "mongodb://localhost/blog";
    if(process.env.NODE_ENV === "production") {
      url = "mongodb://mongo/blog";
    }
    mongoose
      .connect(url, {
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
