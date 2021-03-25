const { expireAsync, TTLAsync, getAsync } = require("./redis");


const tokenTimeVerify = async (ctx, next) => {
  const id = ctx.state.user.id.toString();
  const { authorization } = ctx.request.headers;
  const token = await getAsync(id);
  // slice(7) 是为了去掉 Bearer和后面的一个空格
  if(token !== authorization.slice(7)) {
    ctx.throw(401, "Authentication Error");
  }
  const expireIn = await TTLAsync(id);
  if (expireIn <= 0) {
    ctx.throw(401, "登录已过期，请重新登录");
  } else if (expireIn <= 60 * 60) {
    // 时间小于一小时就重新设置token的过期时间为2小时
    await expireAsync(id, 60 * 60 * 2);
  }
  await next();
};

module.exports = {
  tokenTimeVerify
};
