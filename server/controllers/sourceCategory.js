const SourceCategory = require("../models/sourceCategorys");
const { checkIsAdmin } = require("../utils/help");

class SourceCategoryCtrl {
  // 分页查询学习资源文件夹
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
    const sourceCategorys = await SourceCategory.find(query)
      .sort(sortQuery)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize).populate("create_by");
    const total = await SourceCategory.find(query).countDocuments();
    ctx.body = { sourceCategorys, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 查询所有学习资源分类
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
    const sourceCategorys = await SourceCategory.find(query);
    const total = await SourceCategory.find(query).countDocuments();
    ctx.body = { sourceCategorys, total };
  }

  // 保存学习资源分类
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true, max: 10, trim: true },
      isPublish: { type: "boolean", required: true },
    });
    const { name, isPublish: is_publish } = ctx.request.body;
    const repeatSourceCategory = await SourceCategory.findOne({ name, create_by: ctx.state.user.id });
    if (repeatSourceCategory) {
      ctx.throw(409, "学习资源分类已存在");
    }
    const sourceCategory = await new SourceCategory({ name: name, create_by: ctx.state.user.id, is_publish }).save();
    ctx.body = sourceCategory;
  }

  // 更新学习资源分类
  async update(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      name: { type: "string", required: true, max: 10, trim: true },
      isPublish: { type: "boolean", required: true },
    });
    const { name, isPublish: is_publish } = ctx.request.body;
    const sourceCategory = await SourceCategory.findByIdAndUpdate(
      ctx.params.id,
      { name, is_publish },
      { new: true }
    );
    if (!sourceCategory) {
      ctx.throw(404, "学习资源分类不存在");
    }

    ctx.body = sourceCategory;
  }

  // 修改学习资源分类状态 是否发布
  async updateStatus(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      status: { type: "boolean", required: true }
    });
    const  { status } = ctx.request.body;
    const sourceCategory = await SourceCategory.findByIdAndUpdate(
      ctx.params.id,
      { is_publish: status },
      { new: true, }
    );
    if (!sourceCategory) {
      ctx.throw(404, "学习资源分类不存在");
    }
    ctx.body = sourceCategory;
  }

  // 删除学习资源分类
  async delete(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    const sourceCategory = await SourceCategory.findById(ctx.params.id);
    if (!sourceCategory) {
      ctx.throw(404, "学习资源分类不存在");
    }
    if (sourceCategory.count > 0) {
      ctx.throw(409, "学习资源不为空，不能删除");
    }

    await SourceCategory.findByIdAndRemove(ctx.params.id);

    ctx.status = 204;
  }
}

module.exports = new SourceCategoryCtrl();
