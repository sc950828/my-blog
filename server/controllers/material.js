const Material = require("../models/materials");
const MaterialCategory = require("../models/materialCategorys");
const { checkIsAdmin } = require("../utils/help");
const { del } = require("../utils/alioss");

class MaterialCtrl {
  // 查找
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
      .sort({ createdAt: -1 })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("create_by material_category");
    const total = await Material.find(query).countDocuments();
    ctx.body = { materials, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过id找
  async findById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
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

    const findMaterialCategory = MaterialCategory.findById(materialCategory);
    if (!findMaterialCategory) {
      ctx.throw(404, "素材文件夹不存在");
    }

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
    findMaterialCategory.count += materialLists.length;

    await MaterialCategory.findByIdAndUpdate(
      materialCategory,
      { $inc: { count: materialLists.length } },
      {
        new: true,
      }
    );

    ctx.body = materialLists;
  }

  // 修改所属分类
  async update(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      materialCategory: { type: "string", required: true },
    });
    const { materialCategory } = ctx.request.body;
    const material = await Material.findById(ctx.params.id);
    if (!material) {
      ctx.throw(404, "素材不存在");
    }
    const newMaterial = await Material.findByIdAndUpdate(
      ctx.params.id,
      { material_category: materialCategory },
      { new: true }
    );

    await MaterialCategory.findByIdAndUpdate(
      material.material_category,
      { $inc: { count: -1 } }
    );
    await MaterialCategory.findByIdAndUpdate(
      materialCategory,
      { $inc: { count: 1 } }
    );

    ctx.body = newMaterial;
  }

  // 删除
  async delete(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    const material = await Material.findByIdAndRemove(ctx.params.id);
    if (!material) {
      ctx.throw(404, "素材不存在");
    }

    await MaterialCategory.findByIdAndUpdate(
      material.material_category,
      { $inc: { count: -1 } },
      {
        new: true,
      }
    );

    // 删除oss上面的相应文件
    await del(material.name);

    ctx.status = 204;
  }
}

module.exports = new MaterialCtrl();
