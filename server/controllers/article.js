const Article = require("../models/articles");
const ArticleCategory = require("../models/articleCategorys");
const TimeLine = require("../models/timeLines");
const { checkIsAdmin } = require("../utils/help");

class ArticleCtrl {
  // admin端
  // 分页查找文章
  async find(ctx) {
    const { pageNo = 1, pageSize = 10, createBy, articleCategory, sortField, sortOrder } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 默认查自己
    let query = { create_by: ctx.state.user.id };
    const isAdmin = checkIsAdmin(ctx);
    // 传了id查id 没传查所有
    if (isAdmin) {
      if (createBy) {
        query["create_by"] = createBy;
      } else {
        query = {};
      }
    }
    if(articleCategory) {
      query.article_category = articleCategory;
    }
    const sortQuery = {};
    if(sortOrder && sortField) {
      sortQuery[sortField] = sortOrder.slice(0, -3);
    }
    const articles = await Article.find(query)
      .sort(sortQuery)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("create_by article_category");
    const total = await Article.find(query).countDocuments();
    ctx.body = { articles, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过id查找文章
  async findById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    // 需要内容
    const selectFields = "+content";
    const article = await Article.findById(ctx.params.id).select(selectFields);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    ctx.body = article;
  }

  // 创建文章
  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      banner: { type: "string", required: true },
      content: { type: "object", required: true },
      description: { type: "string", required: true },
      articleCategory: { type: "string", required: true },
      isPublish: { type: "boolean", required: true },
    });
    const { title, description, content, banner, articleCategory: article_category, isPublish: is_publish } = ctx.request.body;
    const repeatedArticle = await Article.findOne({ title, article_category });
    if (repeatedArticle) {
      ctx.throw(409, "文章已存在");
    }

    const article = await new Article({
      title,
      description,
      content,
      banner,
      article_category,
      is_publish,
      create_by: ctx.state.user.id,
    }).save();

    // 文章分类加1
    await ArticleCategory.findByIdAndUpdate(
      article_category,
      { $inc: { count: 1 } },
      { new: true }
    );

    const year = new Date(article.createdAt).getFullYear();
    const month = new Date(article.createdAt).getMonth() + 1;
    const date = new Date(article.createdAt).getDate();

    // 时间线加一条
    new TimeLine({ year, time: `${month}/${date}`, user: ctx.state.user.id, article: article._id }).save();
    ctx.body = article;
  }

  // 编辑文章
  async update(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      title: { type: "string", required: true },
      description: { type: "string", required: true },
      banner: { type: "string", required: true },
      content: { type: "object", required: true },
      articleCategory: { type: "string", required: true },
      isPublish: { type: "boolean", required: true },
    });
    const { title, description, content, banner, articleCategory: article_category, isPublish: is_publish } = ctx.request.body;
    const article = await Article.findById(ctx.params.id);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    await Article.findByIdAndUpdate(
      ctx.params.id,
      {
        title,
        description,
        content,
        banner,
        article_category,
        is_publish,
      },
      {
        new: true,
      }
    );
    // 说明换了分类
    if(article_category !== article.article_category.toString()) {
      await ArticleCategory.findByIdAndUpdate(
        article_category,
        { $inc: { count: 1 } }
      );
      await ArticleCategory.findByIdAndUpdate(
        article.article_category,
        { $inc: { count: -1 } }
      );
    }

    ctx.body = article;
  }

  // 修改状态 是否发布
  async updateStatus(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      status: { type: "boolean", required: true }
    });
    const  { status } = ctx.request.body;
    const article = await Article.findByIdAndUpdate(
      ctx.params.id,
      { is_publish: status },
      { new: true, }
    );
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    ctx.body = article;
  }

  // 删除文章
  async delete(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const article = await Article.findByIdAndRemove(ctx.params.id);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    // 文章类别减一
    await ArticleCategory.findByIdAndUpdate(
      article.article_category,
      { $inc: { count: -1 } },
      {
        new: true,
      }
    );
    // 时间线减除当前文章记录
    TimeLine.findOneAndRemove({ article: ctx.params.id });

    ctx.status = 204;
  }

  // web端
  // 分页查找文章
  async findWeb(ctx) {
    const { pageNo = 1, pageSize = 10, articleCategory } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 默认查自己
    let query = { create_by: ctx.state.user.id, is_publish: true };
    if(articleCategory) {
      query.article_category = articleCategory;
      // 增加阅读量
      await ArticleCategory.findByIdAndUpdate(articleCategory, { $inc: { views: 1 } },{ new: true });
    }

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .select("+content");
    const total = await Article.find(query).countDocuments();
    ctx.body = { articles, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过id查找文章
  async findByIdToWeb(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    // 需要内容
    const selectFields = "+content";
    // 增加阅读量
    const article = await Article.findByIdAndUpdate(
      ctx.params.id,
      { $inc: { views: 1 } },
      { new: true }).select(selectFields);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    ctx.body = article;
  }
}

module.exports = new ArticleCtrl();
