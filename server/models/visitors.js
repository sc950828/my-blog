const { Schema, model } = require("mongoose");

// 游客
const visitorSchema = new Schema(
  {
    // 姓名
    name: { type: String, required: true, trim: true },
    // 密码
    password: { type: String, required: true, select: false },
    // 邮箱
    email: { type: String, required: true },
    // 手机
    phone: { type: String, required: false },
    // 状态
    status: { type: Boolean, default: true },
    // 谁的博客下创建的用户
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Visitor", visitorSchema);
