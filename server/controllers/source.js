const Source = require("../models/sources");
const SourceCategory = require("../models/sourceCategorys");
const { checkIsAdmin } = require("../utils/help");
const mongoose = require("mongoose");

class SourceCtrl {
  // 查找
  async find(ctx) {
    const { pageNo = 1, pageSize = 10, createBy, sourceCategory } = ctx.query;
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
    if(sourceCategory) {
      query.source_category = sourceCategory;
    }
    const sources = await Source.find(query)
      .sort({ createdAt: -1 })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("create_by source_category");
    const total = await Source.find(query).countDocuments();
    ctx.body = { sources, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 查询给web端
  async findWeb(ctx) {
    const { pageNo = 1, pageSize = 10 } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 默认查自己
    let query = { create_by: mongoose.Types.ObjectId( ctx.state.user.id), is_publish: true };
    const total = await Source.find(query).countDocuments();

    const sources = await Source.aggregate([
      { $match: query },
      {
        $group: { _id: '$source_category', name: { $first: '$source_category_name' }, lists: { $push: "$$ROOT" } }
      },
      {
        $limit: _pageSize
      },
      {
        $skip: (_pageNo - 1) * _pageSize
      }
    ]);
    ctx.body = { sources, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过id找
  async findById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    const source = await Source.findById(ctx.params.id);
    if (!source) {
      ctx.throw(404, "学习资源不存在");
    }
    ctx.body = source;
  }

  // 保存学习资源
  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true, max: 10 },
      link: { type: "string", required: true },
      description: { type: "string", required: true, max: 300 },
      isPublish: { type: "boolean", required: true },
      sourceCategory: { type: "string", required: true },
    });
    const { title, link, logo, description, sourceCategory, isPublish: is_publish } = ctx.request.body;
    const findSourceCategory = await SourceCategory.findById(sourceCategory);
    if (!findSourceCategory) {
      ctx.throw(404, "学习资源文件夹不存在");
    }

    const source = await new Source({
      title,
      link,
      logo,
      description,
      is_publish,
      source_category: sourceCategory,
      source_category_name: findSourceCategory.name,
      create_by: ctx.state.user.id
    }).save();

    await SourceCategory.findByIdAndUpdate(
      sourceCategory,
      { $inc: { count: 1 } },
      {
        new: true,
      }
    );

    ctx.body = source;
  }

  // 修改学习资源
  async update(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      title: { type: "string", required: true, max: 10 },
      description: { type: "string", required: true, max: 300 },
      isPublish: { type: "boolean", required: true },
      sourceCategory: { type: "string", required: true },
    });

    const { title, link, logo, description, sourceCategory, isPublish: is_publish } = ctx.request.body;

    const source = await Source.findById(ctx.params.id);
    if (!source) {
      ctx.throw(404, "学习资源不存在");
    }
    const findSourceCategory = await SourceCategory.findById(sourceCategory);
    if (!findSourceCategory) {
      ctx.throw(404, "学习资源文件夹不存在");
    }
    const newSource = await Source.findByIdAndUpdate(
      ctx.params.id,
      { title,
        link,
        logo,
        description,
        source_category: sourceCategory,
        source_category_name: findSourceCategory.name,
        is_publish
      },
      { new: true }
    );

    await SourceCategory.findByIdAndUpdate(
      source.source_category,
      { $inc: { count: -1 } }
    );
    await SourceCategory.findByIdAndUpdate(
      sourceCategory,
      { $inc: { count: 1 } }
    );

    ctx.body = newSource;
  }

  // 修改状态 是否发布
  async updateStatus(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      status: { type: "boolean", required: true }
    });
    const  { status } = ctx.request.body;
    const source = await Source.findByIdAndUpdate(
      ctx.params.id,
      { is_publish: status },
      { new: true, }
    );
    if (!source) {
      ctx.throw(404, "文章不存在");
    }
    ctx.body = source;
  }

  // 删除
  async delete(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    const source = await Source.findByIdAndRemove(ctx.params.id);
    if (!source) {
      ctx.throw(404, "学习资源不存在");
    }

    await SourceCategory.findByIdAndUpdate(
      source.source_category,
      { $inc: { count: -1 } },
      {
        new: true,
      }
    );

    ctx.status = 204;
  }
}

module.exports = new SourceCtrl();
