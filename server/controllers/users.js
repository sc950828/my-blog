const User = require("../models/users");
const jsonwebtoken = require("jsonwebtoken");
const { setAsync, expireAsync, delAsync, getAsync } = require("../utils/redis");
const { initSecret } = require("../utils/secret");

class UserCtrl {
  async find(ctx) {
    // 查找出非管理员账号 也就是作者账号
    const query = { is_admin: false };
    // 分页
    const { pageNo = 1, pageSize = 10 } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // fields=educations;employments;
    const { fields = "" } = ctx.query;
    const selectFields = fields
      .split(";")
      .filter((f) => f)
      .map((f) => ` +${f}`)
      .join("");
    // "+educations +employments"
    const users = await User.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .select(selectFields);
    const total = await User.find(query).countDocuments();
    ctx.body = { users, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  async findById(ctx) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  // 获取用户信息
  async getUserInfo(ctx) {
    const selectFields =
      "+educations +employments +origin_locations +locations +headline";
    const user = await User.findById(ctx.state.user.id).select(selectFields);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  // 注册
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
      email: { type: "string", required: true },
    });
    const { name, email } = ctx.request.body;
    const repeatedUser = await User.findOne({ name, email });
    if (repeatedUser) {
      ctx.throw(409, "用户已存在");
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  // 登录
  async login(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { name, password, remember } = ctx.request.body;
    const user = await User.findOne({ name, password });
    if (!user) {
      ctx.throw(401, "用户名或密码不正确");
    }
    const { _id, name: _name, is_admin } = user;
    const id = _id.toString();
    const secret = await initSecret();
    // 不设置过期时间, expiresIn: '2h'
    const token = jsonwebtoken.sign({ id, name: _name, is_admin }, secret);
    // redis设置token
    await setAsync(id, token);
    // 记住我
    if(remember) {
      // 设置token的过期时间为7天
      await expireAsync(id, 60 * 60 * 24 * 7);
    } else {
      // 设置token的过期时间为2小时
      await expireAsync(id, 60 * 60 * 2);
    }
    ctx.body = { token };
  }

  async logout(ctx) {
    await delAsync(ctx.state.user.id);
    ctx.status = 204;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      password: { type: "string", required: false },
      locations: { type: "array", itemType: "string", required: false },
      employments: { type: "array", itemType: "object", required: false },
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
      new: true,
    });
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.status = 204;
  }

  async verifyUpdatePasswordEmailCode(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      code: { type: "string", required: true },
    });
    const { email, code } = ctx.request.body;
    // redis设置token
    const randomCode = await getAsync(email);
    if(randomCode !== code) {
      ctx.throw(401, "验证码验证失败");
      console.log(randomCode);
      console.log(code);
    }

    ctx.status = 200;
  }

  async updatePassword(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { email, password } = ctx.request.body;
    const user = await User.findOneAndUpdate({ email }, { password }, {
      new: true,
    });
    if (!user) {
      ctx.throw(404, "用户不存在");
    }

    ctx.body = user;
  }
}

module.exports = new UserCtrl();
