const Material = require("../models/materials");
const { checkIsAdmin } = require("../utils/help");
const { del } = require("../utils/alioss");

class MaterialCtrl {
  async find(ctx) {
    const { pageNo = 1, pageSize = 10, createBy, materialCategory } = ctx.query;
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
    if(materialCategory) {
      query.material_category = materialCategory;
    }
    const materials = await Material.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await Material.find(query).countDocuments();
    ctx.body = { materials, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  async findById(ctx) {
    const material = await Material.findById(ctx.params.id);
    if (!material) {
      ctx.throw(404, "素材不存在");
    }
    ctx.body = material;
  }

  // 保存素材
  async create(ctx) {
    ctx.verifyParams({
      fileList: { type: "array", itemType: "object", required: true },
      materialCategory: { type: "string", required: true },
    });
    const { fileList, materialCategory } = ctx.request.body;
    const materialLists = [];
    for (const file of fileList) {
      const { uid, url } = file;
      const material = await new Material({
        name: uid,
        link: url,
        material_category: materialCategory,
        create_by: ctx.state.user.id
      }).save();
      materialLists.push(material);
    }
    ctx.body = materialLists;
  }

  async delete(ctx) {
    const material = await Material.findByIdAndRemove(ctx.params.id);
    if (!material) {
      ctx.throw(404, "素材不存在");
    }

    // 删除oss上面的相应文件
    await del(material.name);

    ctx.status = 204;
  }
}

module.exports = new MaterialCtrl();
