const MaterialCategory = require("../models/materialCategorys");
const { checkIsAdmin } = require("../utils/help");

class MaterialCategoryCtrl {
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
    const materialCategorys = await MaterialCategory.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await MaterialCategory.find(query).countDocuments();
    ctx.body = { materialCategorys, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 保存素材
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
    });
    const { name } = ctx.request.body;
    const repeatMaterial = await MaterialCategory.findOne({ name,create_by: ctx.state.user.id });
    if (repeatMaterial) {
      ctx.throw(409, "素材类别已存在");
    }
    const materialCategory = await new MaterialCategory({ name: name, create_by: ctx.state.user.id }).save();
    ctx.body = materialCategory;
  }

  // 更新素材
  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
    });
    const { name } = ctx.request.body;
    const materialCategory = await MaterialCategory.findByIdAndUpdate(
      ctx.params.id,
      { name },
      {
        new: true,
      }
    );
    if (!materialCategory) {
      ctx.throw(409, "素材类别不存在");
    }

    ctx.body = materialCategory;
  }

  async delete(ctx) {
    const materialCategory = await MaterialCategory.findByIdAndRemove(ctx.params.id);
    if (!materialCategory) {
      ctx.throw(404, "素材类别不存在");
    }

    ctx.status = 204;
  }
}

module.exports = new MaterialCategoryCtrl();
