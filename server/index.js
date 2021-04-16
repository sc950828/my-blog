const Koa = require("koa");
const koaBody = require("koa-body");
const KoaJsonError = require("koa-json-error");
const parameter = require("koa-parameter");
const koaStatic = require("koa-static");
const jwt = require("koa-jwt");
const routing = require("./routes");
const runmongodb = require("./utils/mongodb");
const { initSecret } = require("./utils/secret");
const getIp = require("./utils/getIp");
const path = require("path");
const app = new Koa();

const main = async () => {
  // 运行mongodb
  await runmongodb();

  // 错误处理
  let options = {
  // Avoid showing the stacktrace in 'production' env
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  };
  app.use(KoaJsonError(options));

  // 在 Koa 应用里设置 app.proxy 为 true。为了获取真实ip
  app.proxy = true;

  // 获取ip
  getIp(app);

  // 获取请求体
  app.use(
    koaBody({
    // 处理文件上传
      multipart: true,
      formidable: {
      // 使用oss上传就注释 上传到本地就打开
      // uploadDir: path.join(__dirname, "./public/uploads"),
        keepExtensions: true,
      },
    })
  );

  const secret = await initSecret();
  // jwt验证 排除静态文件夹和登录接口
  app.use(jwt({ secret }).unless({
    path: [
      /^\/uploads/,
      /^\/users\/login/,
      /^\/home\/sendUpdatePasswordMail/,
      /^\/users\/verifyUpdatePasswordEmailCode/,
      /^\/users\/updatePassword/,
    ]
  }));

  // 静态文件处理 把路径设为能公开访问的文件夹
  // http://localhost:3000/uploads/xxx获取uploads下的资源
  app.use(koaStatic(path.join(__dirname, "./public")));

  // 参数校验
  parameter(app);

  // 注册路由
  routing(app);

  // 启动app
  app.listen(5000, () => console.log("server启动成功"));
};

main();

