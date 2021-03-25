const Setting = require("../models/setting");

class SettingCtrl {
  // 查找
  async find(ctx) {
    const { pageNo = 1, pageSize = 10, searchKey } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    const query = {};
    if(searchKey) {
      const reg = new RegExp(searchKey, 'i');
      query["$or"] = [
        { key: { $regex: reg } },
      ];
    }
    const settings = await Setting.find(query)
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await Setting.find().countDocuments(query);
    ctx.body = { settings, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 通过key找设置
  async getSetting(ctx) {
    ctx.verifyParams({
      key: { type: "string", required: true },
    });
    const setting = await Setting.findOne({ key: ctx.params.key });

    if (!setting) {
      ctx.throw(404, "设置不存在");
    }
    ctx.body = setting;
  }

  // 保存设置
  async saveSetting(ctx) {
    ctx.verifyParams({
      key: { type: "string", required: true },
      value: { type: "string", required: true },
    });
    const setting = await Setting.findOne({ key: ctx.request.body.key });
    if(setting) {
      ctx.throw(409, "设置已存在");
    }
    const results = await new Setting(ctx.request.body).save();

    ctx.body = results;
  }

  // 修改
  async updateSettingByKey(ctx) {
    ctx.verifyParams({
      key: { type: "string", required: true },
      value: { type: "string", required: true },
    });
    const { key, value } = ctx.request.body;
    const setting = await Setting.findOneAndUpdate({ key }, { value }, {
      new: true,
    });

    ctx.body =  setting;
  }

  // 修改
  async updateSettingById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
      value: { type: "string", required: true },
    });
    const setting = await Setting.findByIdAndUpdate(ctx.params.id, { value: ctx.request.body.value }, {
      new: true,
    });

    ctx.body =  setting;
  }

  // 删除
  async deleteByKey(ctx) {
    ctx.verifyParams({
      key: { type: "string", required: true },
    });
    const setting = await Setting.findOneAndRemove({ key: ctx.query.key });
    if (!setting) {
      ctx.throw(404, "设置不存在");
    }
    ctx.status = 204;
  }

  // 删除
  async deleteById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const setting = await Setting.findByIdAndRemove(ctx.params.id);
    if (!setting) {
      ctx.throw(404, "设置不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new SettingCtrl();
