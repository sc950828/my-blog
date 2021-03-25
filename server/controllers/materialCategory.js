const MaterialCategory = require("../models/materialCategorys");
const { checkIsAdmin } = require("../utils/help");

class MaterialCategoryCtrl {
  // 查询
  async find(ctx) {
    const { pageNo = 1, pageSize = 10, createBy } = ctx.query;
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
    const materialCategorys = await MaterialCategory.find(query)
      .sort({ createdAt: -1 })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize).populate("create_by");
    const total = await MaterialCategory.find(query).countDocuments();
    ctx.body = { materialCategorys, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 查询
  async findAll(ctx) {
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
    const materialCategorys = await MaterialCategory.find(query);
    const total = await MaterialCategory.find(query).countDocuments();
    ctx.body = { materialCategorys, total };
  }

  // 保存素材文件夹
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true, max: 10, trim: true },
    });
    const { name } = ctx.request.body;
    const repeatMaterialCategory = await MaterialCategory.findOne({ name, create_by: ctx.state.user.id });
    if (repeatMaterialCategory) {
      ctx.throw(409, "素材文件夹已存在");
    }
    const materialCategory = await new MaterialCategory({ name: name, create_by: ctx.state.user.id }).save();
    ctx.body = materialCategory;
  }

  // 更新素材文件夹
  async update(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      name: { type: "string", required: true, max: 10, trim: true },
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
      ctx.throw(404, "素材文件夹不存在");
    }

    ctx.body = materialCategory;
  }

  // 删除
  async delete(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    const materialCategory = await MaterialCategory.findById(ctx.params.id);
    if (!materialCategory) {
      ctx.throw(404, "素材文件夹不存在");
    }
    if (materialCategory.count > 0) {
      ctx.throw(409, "素材文件不为空，不能删除");
    }

    await MaterialCategory.findByIdAndRemove(ctx.params.id);

    ctx.status = 204;
  }
}

module.exports = new MaterialCategoryCtrl();
