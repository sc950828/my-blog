const { checkIsAdmin } = require("./help");
const ArticleCategory = require("../models/articleCategorys");
const Article = require("../models/articles");
const Visitor = require("../models/visitors");
const Material = require("../models/materials");
const MaterialCategory = require("../models/materialCategorys");

module.exports = {
  async checkArticleCategoryIsOwn(ctx, next) {
    const isAdmin = checkIsAdmin(ctx);
    const userId = ctx.state.user.id;
    if (!isAdmin) {
      const category = await ArticleCategory.findById(ctx.params.id);
      if (!category) {
        ctx.throw(404, "类目不存在");
      }
      const createBy = category["create_by"].toString();
      if (createBy !== userId) {
        ctx.throw(403, "暂无权限");
      }
    }

    await next();
  },
  async checkArticleIsOwn(ctx, next) {
    const isAdmin = checkIsAdmin(ctx);
    const userId = ctx.state.user.id;
    if (!isAdmin) {
      const article = await Article.findById(ctx.params.id);
      if (!article) {
        ctx.throw(404, "文章不存在");
      }
      const createBy = article["create_by"].toString();
      if (createBy !== userId) {
        ctx.throw(403, "暂无权限");
      }
    }
    await next();
  },
  async checkVisitorIsOwn(ctx, next) {
    const isAdmin = checkIsAdmin(ctx);
    const userId = ctx.state.user.id;
    if (!isAdmin) {
      const visitor = await Visitor.findById(ctx.params.id);
      if (!visitor) {
        ctx.throw(404, "游客不存在");
      }
      const createBy = visitor["create_by"].toString();
      if (createBy !== userId) {
        ctx.throw(403, "暂无权限");
      }
    }
    await next();
  },
  async checkMaterialIsOwn(ctx, next) {
    const isAdmin = checkIsAdmin(ctx);
    const userId = ctx.state.user.id;
    if (!isAdmin) {
      const material = await Material.findById(ctx.params.id);
      if (!material) {
        ctx.throw(404, "素材不存在");
      }
      const createBy = material["create_by"].toString();
      if (createBy !== userId) {
        ctx.throw(403, "暂无权限");
      }
    }
    await next();
  },
  async checkMaterialCategoryIsOwn(ctx, next) {
    const isAdmin = checkIsAdmin(ctx);
    const userId = ctx.state.user.id;
    if (!isAdmin) {
      const materialCategory = await MaterialCategory.findById(ctx.params.id);
      if (!materialCategory) {
        ctx.throw(404, "素材文件夹不存在");
      }
      const createBy = materialCategory["create_by"].toString();
      if (createBy !== userId) {
        ctx.throw(403, "暂无权限");
      }
    }
    await next();
  },
  async checkIsAdmin(ctx, next) {
    const isAdmin = checkIsAdmin(ctx);
    if (!isAdmin) {
      ctx.throw(403, "暂无权限");
    }
    await next();
  },
};
