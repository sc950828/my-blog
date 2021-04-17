const Visitor = require("../models/visitors");
const { checkIsAdmin } = require("../utils/help");
const jsonwebtoken = require("jsonwebtoken");
const { initSecret } = require("../utils/secret");
const { getAsync } = require("../utils/redis");

class VisitorCtrl {
  // 查找
  async find(ctx) {
    const { pageNo = 1, pageSize = 10 } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    let query = { create_by: ctx.state.user.id };
    const isAdmin = checkIsAdmin(ctx);
    // 传了id查id 没传查所有
    if (isAdmin) {
      if (ctx.query.createBy) {
        query["create_by"] = ctx.query.createBy;
      } else {
        query = {};
      }
    }
    const visitors = await Visitor.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await Visitor.find(query).countDocuments();
    ctx.body = { visitors, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过id查找
  async findById(ctx) {
    const visitor = await Visitor.findById(ctx.params.id);
    if (!visitor) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = visitor;
  }

  // 创建
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true, max: 5 },
      email: { type: "email", required: true },
      code: { type: "string", required: true, max: 4, min: 4 },
      password: { type: "string", required: true, min: 6, max: 18 },
    });
    const  { name, password, email, code } = ctx.request.body;
    const oldVisitor = await Visitor.findOne({ email });
    if(oldVisitor) {
      ctx.throw(409, "用户已存在");
    }
    // redis获取code
    const randomCode = await getAsync(email);
    if(!randomCode) {
      ctx.throw(410, "验证码已失效");
    }
    if(randomCode !== code) {
      ctx.throw(410, "验证码验证失败");
    }
    const visitor = await new Visitor({ name, email, password, create_by: ctx.state.user.id }).save();

    ctx.body = visitor;
  }

  // 找回密码
  async forgetPassword(ctx) {
    ctx.verifyParams({
      email: { type: "email", required: true },
      code: { type: "string", required: true, max: 4, min: 4 },
      password: { type: "string", required: true, min: 6, max: 18 },
    });
    const  { password, email, code } = ctx.request.body;
    const oldVisitor = await Visitor.findOne({ email });
    if(!oldVisitor) {
      ctx.throw(410, "用户不存在");
    }
    // redis获取code
    const randomCode = await getAsync(email);
    if(!randomCode) {
      ctx.throw(410, "验证码已失效");
    }
    if(randomCode !== code) {
      ctx.throw(410, "验证码验证失败");
    }

    const visitor = await Visitor.findByIdAndUpdate(oldVisitor._id, { password }, { new: true });

    ctx.body = visitor;
  }

  // 登录
  async login(ctx) {
    ctx.verifyParams({
      email: { type: "email", required: true },
      password: { type: "password", required: true, min: 6, max: 18 },
    });
    const { email, password } = ctx.request.body;
    const visitor = await Visitor.findOne({ email, password });
    if (!visitor) {
      ctx.throw(410, "用户名或密码不正确");
    }
    if (!visitor.status) {
      ctx.throw(410, "您已被禁用，请联系管理员");
    }
    const { _id, name: _name, email: _email } = visitor;
    const id = _id.toString();
    const secret = await initSecret();
    // 不设置过期时间
    const token = jsonwebtoken.sign({ id, name: _name, email: _email }, secret);

    ctx.body = { token, visitor };
  }

  // 删除
  async delete(ctx) {
    const visitor = await Visitor.findByIdAndRemove(ctx.params.id);
    if (!visitor) {
      ctx.throw(404, "用户不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new VisitorCtrl();
