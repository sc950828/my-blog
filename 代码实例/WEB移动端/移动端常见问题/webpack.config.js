const path = require("path");

module.exports = {
  devServer: {
    // 端口
    port: "9000",
    // ip
    host: "0.0.0.0",
    // 实时刷新，默认开启
    inline: true,
    // 自动打开浏览器
    open: false,
    // 错误在页面也出现,不仅仅是控制台
    overlay: true,
    // 热替换模式 默认未开启 开启后修改代码不实时刷新页面
    hot: true
  }
};
