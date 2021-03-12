const Setting = require("../models/setting");

class SettingCtrl {
  async find(ctx) {
    const { pageNo = 1, pageSize = 10 } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    const settings = await Setting.find()
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize);
    const total = await Setting.find().countDocuments();
    ctx.body = { settings, total, pageNo: _pageNo, pageSize: _pageSize };
  }

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

  async updateSettingByKey(ctx) {
    ctx.verifyParams({
      key: { type: "string", required: true },
    });
    const { key, value } = ctx.request.body;
    const setting = await Setting.findOneAndUpdate({ key }, { value }, {
      new: true,
    });

    ctx.body =  setting;
  }

  async updateSettingById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const setting = await Setting.findByIdAndUpdate(ctx.params.id, { value: ctx.request.body.value }, {
      new: true,
    });

    ctx.body =  setting;
  }

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
