const ArticleCategory = require("../models/articleCategorys");
const { checkIsAdmin } = require("../utils/help");

class ArticleCategoryCtrl {
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
    const articleCategorys = await ArticleCategory.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("create_by");
    const total = await ArticleCategory.find(query).countDocuments();
    ctx.body = { articleCategorys, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  async findById(ctx) {
    const category = await ArticleCategory.findById(ctx.params.id);
    if (!category) {
      ctx.throw(404, "类目不存在");
    }
    ctx.body = category;
  }

  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      description: { type: "string", required: true },
    });
    const { title } = ctx.request.body;
    const repeatedArticleCategory = await ArticleCategory.findOne({ title });
    if (repeatedArticleCategory) {
      ctx.throw(409, "类目已存在");
    }
    const category = await new ArticleCategory({
      ...ctx.request.body,
      create_by: ctx.state.user.id,
    }).save();
    ctx.body = category;
  }

  async update(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: false },
      description: { type: "string", required: false },
    });
    const category = await ArticleCategory.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true,
      }
    );
    if (!category) {
      ctx.throw(404, "类目不存在");
    }
    ctx.body = category;
  }

  async delete(ctx) {
    const category = await ArticleCategory.findByIdAndRemove(ctx.params.id);
    if (!category) {
      ctx.throw(404, "类目不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new ArticleCategoryCtrl();
