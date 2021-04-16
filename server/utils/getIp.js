module.exports = (app) => {
  app.use(async (ctx, next) => {
    console.log(ctx.request.ip);
    console.log(ctx.request.headers['x-forwarded-for']);
    console.log(ctx.request.ips);
    await next();
  });
};
