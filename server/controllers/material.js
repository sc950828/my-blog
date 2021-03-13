const Material = require("../models/materials");
const { checkIsAdmin } = require("../utils/help");
// const { del, uploadImg, uploadFile } = require("../utils/alioss");

class MaterialCtrl {
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
    const material = await Material.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await Material.find(query).countDocuments();
    ctx.body = { material, total, pageNo: _pageNo, pageSize: _pageSize };
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
      link: { type: "string", required: true },
      materialCategory: { type: "string", required: true },
    });
    const { name, materialCategory } = ctx.request.body;
    const repeatMaterial = await Material.findOne({ name, materialCategory });
    if (repeatMaterial) {
      ctx.throw(409, "素材已存在");
    }
    const material = await new Material(ctx.request.body).save();
    ctx.body = material;
  }

  async delete(ctx) {
    const material = await Material.findByIdAndRemove(ctx.params.id);
    if (!material) {
      ctx.throw(404, "素材不存在");
    }

    // 删除oss上面的相应文件
    // const result = await del("blog/images/upload_cc7e25eea3cfb6d1b53e9a13b68d9a95.jpg");

    ctx.status = 204;
  }
}

module.exports = new MaterialCtrl();
