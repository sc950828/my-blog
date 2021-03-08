const Article = require("../models/articles");
const { checkIsAdmin } = require("../utils/help");

class ArticleCtrl {
  // 分页查找文章
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
    const articles = await Article.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("create_by");
    const total = await Article.find(query).countDocuments();
    ctx.body = { articles, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过id查找文章
  async findById(ctx) {
    const article = await Article.findById(ctx.params.id);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    ctx.body = article;
  }

  // 创建文章
  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      content: { type: "string", required: true },
    });
    const { title } = ctx.request.body;
    const repeatedArticle = await Article.findOne({ title });
    if (repeatedArticle) {
      ctx.throw(409, "文章已存在");
    }
    const article = await new Article({
      ...ctx.request.body,
      create_by: ctx.state.user.id,
    }).save();
    ctx.body = article;
  }

  // 编辑文章
  async update(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: false },
      content: { type: "string", required: false },
    });
    const article = await Article.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true,
      }
    );
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    ctx.body = article;
  }

  // 删除文章
  async delete(ctx) {
    const article = await Article.findByIdAndRemove(ctx.params.id);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new ArticleCtrl();
