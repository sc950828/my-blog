const ArticleCategory = require("../models/articleCategorys");
const { checkIsAdmin } = require("../utils/help");
class ArticleCategoryCtrl {
  // admin端
  // 分页查询章分类文件夹
  async find(ctx) {
    const { pageNo = 1, pageSize = 10, createBy, sortField, sortOrder } = ctx.query;
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
    const sortQuery = {};
    if(sortOrder && sortField) {
      sortQuery[sortField] = sortOrder.slice(0, -3);
    }
    const articleCategorys = await ArticleCategory.find(query)
      .sort(sortQuery)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("create_by");
    const total = await ArticleCategory.find(query).countDocuments();
    ctx.body = { articleCategorys, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 不分页查询所有章分类文件夹
  async findAll(ctx) {
    const { createBy } = ctx.query;
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
    const articleCategorys = await ArticleCategory.find(query);
    const total = await ArticleCategory.find(query).countDocuments();
    ctx.body = { articleCategorys, total };
  }

  // 通过id查询章分类文件夹
  async findById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    // 需要描述
    const selectFields = "+description";
    const articleCategory = await ArticleCategory.findById(ctx.params.id).select(selectFields);
    if (!articleCategory) {
      ctx.throw(404, "类目不存在");
    }
    ctx.body = articleCategory;
  }

  // 创建文章分类文件夹
  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true, trim: true, max: 20 },
      description: { type: "string", required: true, trim: true, max: 300 },
      banner: { type: "string", required: true },
      isPublish: { type: "boolean", required: true },
    });
    const { title, description, banner, isPublish: is_publish } = ctx.request.body;
    const repeatedArticleCategory = await ArticleCategory.findOne({ title });
    if (repeatedArticleCategory) {
      ctx.throw(409, "类目已存在");
    }
    const articleCategory = await new ArticleCategory({
      title,
      banner,
      is_publish,
      description,
      create_by: ctx.state.user.id,
    }).save();
    ctx.body = articleCategory;
  }

  // 修改章分类文件夹
  async update(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true, trim: true, max: 20 },
      description: { type: "string", required: true, trim: true, max: 300 },
      banner: { type: "string", required: true },
      isPublish: { type: "boolean", required: true },
    });
    const { title, description, banner, isPublish: is_publish } = ctx.request.body;
    const articleCategory = await ArticleCategory.findByIdAndUpdate(
      ctx.params.id,
      {
        title,
        description,
        banner,
        is_publish
      },
      {
        new: true,
      }
    );
    if (!articleCategory) {
      ctx.throw(404, "文章分类不存在");
    }
    ctx.body = articleCategory;
  }

  // 修改状态 是否发布
  async updateStatus(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      status: { type: "boolean", required: true }
    });
    const  { status } = ctx.request.body;
    const articleCategory = await ArticleCategory.findByIdAndUpdate(
      ctx.params.id,
      { is_publish: status },
      { new: true, }
    );
    if (!articleCategory) {
      ctx.throw(404, "文章分类不存在");
    }
    ctx.body = articleCategory;
  }

  // 删除章分类文件夹
  async delete(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });

    const articleCategory = await ArticleCategory.findById(ctx.params.id);
    if (!articleCategory) {
      ctx.throw(404, "文章分类不存在");
    }
    if (articleCategory.count > 0) {
      ctx.throw(409, "文章分类不为空，不能删除");
    }
    await ArticleCategory.findByIdAndRemove(ctx.params.id);

    ctx.status = 204;
  }

  // web端
  // 查询章分类文件夹
  async findWeb(ctx) {
    const { pageNo = 1, pageSize = 12 } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 默认查自己
    let query = { create_by: ctx.state.user.id, is_publish: true };
    const articleCategorys = await ArticleCategory.find(query)
      .sort({ createdAt: 1 })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .select("+description");
    const total = await ArticleCategory.find(query).countDocuments();
    ctx.body = { articleCategorys, total, pageNo: _pageNo, pageSize: _pageSize };
  }
}

module.exports = new ArticleCategoryCtrl();
