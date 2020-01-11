module.exports = {
  devServer: {
    port: "9000",
    host: "0.0.0.0",
    inline: true, //实时刷新，默认开启
    open: false, //自动打开浏览器,
    overlay: true, //错误在页面也出现,不仅仅是控制台
    hot: true //热替换模式 默认未开启 开启后修改代码不实时刷新页面
  }
};
