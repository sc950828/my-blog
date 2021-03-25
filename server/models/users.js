const { Schema, model } = require("mongoose");

// 用户
const userSchema = new Schema(
  {
    // 账号
    name: { type: String, required: true, trim: true },
    // 姓名
    nick_name: { type: String, required: false, trim: true },
    // 密码 不想被查询到使用 select: false
    password: { type: String, required: true, select: false },
    // 邮箱
    email: { type: String, required: true },
    // 性别
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    // 手机
    phone: { type: String, required: false, default: "" },
    // 微信
    wechat: { type: String, required: true },
    // qq
    qq: { type: String, required: true },
    // 职业
    job: { type: String, required: true },
    // 头像
    avatar_url: { type: String, default: "https://xiaosu72.oss-cn-shanghai.aliyuncs.com/blog/images/upload_f72344416dcc474c5f754ed0736948bd.jpg" },
    // 是否是管理员否则就是创作者
    is_admin: { type: Boolean, default: false },
    // 状态 是否启用
    status: { type: Boolean, default: true },
    // 简介
    introduction: { type: { mdValue: { type: String }, htmlValue: { type: String } }, required: false, select: false },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
