const Project = require("../models/projects");
const { checkIsAdmin } = require("../utils/help");

class ProjectCtrl {
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
    const projects = await Project.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await Project.find(query).countDocuments();
    ctx.body = { projects, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 保存项目
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      banner: { type: "string", required: true },
    });
    const { name, banner } = ctx.request.body;
    const repeatProject = await Project.findOne({ name, create_by: ctx.state.user.id });
    if (repeatProject) {
      ctx.throw(409, "项目已存在");
    }
    const project = await new Project({ name, banner, create_by: ctx.state.user.id }).save();
    ctx.body = project;
  }

  // 更新项目
  async update(ctx) {
    const project = await Project.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true,
      }
    );
    if (!project) {
      ctx.throw(409, "项目不存在");
    }

    ctx.body = project;
  }

  async delete(ctx) {
    const project = await Project.findByIdAndRemove(ctx.params.id);
    if (!project) {
      ctx.throw(404, "项目不存在");
    }

    ctx.status = 204;
  }
}

module.exports = new ProjectCtrl();
