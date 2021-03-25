const Visitor = require("../models/visitors");
const { checkIsAdmin } = require("../utils/help");

class VisitorCtrl {
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

  async findById(ctx) {
    const visitor = await Visitor.findById(ctx.params.id);
    if (!visitor) {
      ctx.throw(404, "游客不存在");
    }
    ctx.body = visitor;
  }

  async delete(ctx) {
    const visitor = await Visitor.findByIdAndRemove(ctx.params.id);
    if (!visitor) {
      ctx.throw(404, "游客不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new VisitorCtrl();
