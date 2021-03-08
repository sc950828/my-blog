const Tag = require("../models/tags");
const { checkIsAdmin } = require("../utils/help");

class TagCtrl {
  async find(ctx) {
    const { pageNo = 1, pageSize = 10 } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 默认查自己
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
    const tags = await Tag.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await Tag.find(query).countDocuments();
    ctx.body = { tags, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  async findAll(ctx) {
    // 查自己所有
    let query = { create_by: ctx.state.user.id };
    ctx.body = await Tag.find(query);
  }

  async findById(ctx) {
    const tags = await Tag.findById(ctx.params.id);
    if (!tags) {
      ctx.throw(404, "标签不存在");
    }
    ctx.body = tags;
  }

  async delete(ctx) {
    const tags = await Tag.findByIdAndRemove(ctx.params.id);
    if (!tags) {
      ctx.throw(404, "标签不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new TagCtrl();
