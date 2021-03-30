const { createProxyMiddleware } = require('http-proxy-middleware');

// 配置代理
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api',{
        "target": "http://localhost:5000",
        // "target": "http://47.117.129.194:5000",// 生产
        "pathRewrite": {
            "^/api": ""
        },
        changeOrigin: true,
    })
  );
};
