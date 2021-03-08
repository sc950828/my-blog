const { Schema, model } = require("mongoose");

// 游客
const visitorSchema = new Schema(
  {
    // 姓名
    name: { type: String, required: true, trim: true },
    // 邮箱
    email: { type: String, required: true },
    // 手机
    phone: { type: String, required: false },
    // 谁的留言下创建的
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Visitor", visitorSchema);
