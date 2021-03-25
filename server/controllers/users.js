const User = require("../models/users");
const jsonwebtoken = require("jsonwebtoken");
const { setAsync, expireAsync, delAsync, getAsync } = require("../utils/redis");
const { initSecret } = require("../utils/secret");

class UserCtrl {
  // 分页查找
  async find(ctx) {
    // 分页
    const { pageNo = 1, pageSize = 10, searchKey, fields="" } = ctx.query;
    // 查找出非管理员账号 也就是作者账号
    const query = { is_admin: false };
    if(searchKey) {
      const reg = new RegExp(searchKey, 'i');
      query["$or"] = [
        { name: { $regex: reg } },
        { email: { $regex: reg } },
        { nick_name: { $regex: reg } },
      ];
    }
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // fields=password;introduction;
    const selectFields = fields
      .split(";")
      .filter((f) => f)
      .map((f) => ` +${f}`)
      .join("");
    // "+password +introduction"
    const users = await User.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .select(selectFields);
    const total = await User.find(query).countDocuments();
    ctx.body = { users, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过id找
  async findById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    // 通过id找 返回所有信息
    const user = await User.findById(ctx.params.id).select("+password +introduction");
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  // 获取用户信息
  async getUserInfo(ctx) {
    // 多返回简介
    const selectFields = "+introduction";
    const user = await User.findById(ctx.state.user.id).select(selectFields);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  // 注册
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true, max: 10 },
      nickName: { type: "string", required: true, max: 4 },
      qq: { type: "string", required: true, max: 15 },
      wechat: { type: "string", required: true, max: 20 },
      job: { type: "string", required: true, max: 20 },
      password: { type: "password", required: true, min: 6 },
      email: { type: "email", required: true },
      status: { type: "boolean", required: true },
      gender: { type: "enum", required: true, values: ['male', 'female'] },
    });
    const  { name, nickName: nick_name, job, wechat, qq, gender, email, password, avatar: avatar_url, introduction="", status, phone } = ctx.request.body;
    const repeatedUser = await User.findOne({ name, email });
    if (repeatedUser) {
      ctx.throw(409, "用户已存在");
    }
    const user = await new User(
      {
        name, nick_name, job, wechat, qq, password, gender, email, avatar_url, introduction, status, phone
      },
    ).save();
    ctx.body = user;
  }

  // 登录
  async login(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true, max: 10 },
      password: { type: "password", required: true, min: 6 },
    });
    const { name, password, remember } = ctx.request.body;
    const user = await User.findOne({ name, password });
    if (!user) {
      ctx.throw(400, "用户名或密码不正确");
    }
    if (!user.status) {
      ctx.throw(400, "该用户已禁用，请联系管理员");
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

  // 退出
  async logout(ctx) {
    await delAsync(ctx.state.user.id);
    ctx.status = 204;
  }

  // 修改
  async update(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      name: { type: "string", required: true, max:10 },
      nickName: { type: "string", required: true, max: 4 },
      qq: { type: "string", required: true, max: 15 },
      wechat: { type: "string", required: true, max: 20 },
      job: { type: "string", required: true, max: 20 },
      password: { type: "password", required: true, min: 6 },
      status: { type: "boolean", required: true },
      email: { type: "email", required: true },
      gender: { type: "enum", required: true, values: ['male', 'female'] },
    });
    const  { name, nickName: nick_name, job, wechat, qq, gender, email, password, avatar: avatar_url, introduction="",status, phone } = ctx.request.body;
    const user = await User.findByIdAndUpdate(
      ctx.params.id,
      {
        name, nick_name, job, wechat, qq,password, gender, email, avatar_url, introduction, status, phone
      },
      {
        new: true,
      }
    );
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  // 修改状态
  async updateStatus(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      status: { type: "boolean", required: true }
    });
    const  { status } = ctx.request.body;
    const user = await User.findByIdAndUpdate(
      ctx.params.id,
      { status },
      { new: true, }
    );
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  // 删除
  async delete(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.status = 204;
  }

  // 验证邮箱验证码
  async verifyUpdatePasswordEmailCode(ctx) {
    ctx.verifyParams({
      email: { type: "email", required: true },
      code: { type: "string", required: true, min: 4, max: 4 },
    });
    const { email, code } = ctx.request.body;
    // redis获取code
    const randomCode = await getAsync(email);
    if(randomCode !== code) {
      ctx.throw(400, "验证码验证失败");
    }

    ctx.status = 200;
  }

  // 修改密码 通过邮箱
  async updatePassword(ctx) {
    ctx.verifyParams({
      email: { type: "email", required: true },
      password: { type: "password", required: true, min: 6 }
    });
    const { email, password } = ctx.request.body;
    const user = await User.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );
    if (!user) {
      ctx.throw(404, "用户不存在");
    }

    ctx.body = user;
  }

  // 修改密码通过老密码
  async updatePwdByOldPwd(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      oldPassword: { type: "password", required: true, min: 6 },
      password: { type: "password", required: true, min: 6 }
    });
    const { id, oldPassword, password } = ctx.request.body;
    const user = await User.findOneAndUpdate(
      { _id: id, password: oldPassword },
      { password },
      { new: true }
    );
    if (!user) {
      ctx.throw(400, "原密码不正确");
    }

    ctx.body = user;
  }
}

module.exports = new UserCtrl();
