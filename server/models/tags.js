const { Schema, model } = require("mongoose");

// 用户标签
const tagSchema = new Schema(
  {
    // 姓名
    title: { type: String, required: true, trim: true },
    // 类型
    type: { type: String, required: true },
    // 排序
    sort: { type: Number, required: false },
    // 谁的留言下创建的
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Tag", tagSchema);
