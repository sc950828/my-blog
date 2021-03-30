const { Schema, model } = require("mongoose");

// 资源类别
const sourceCategorySchema = new Schema(
  {
    // name
    name: { type: String, required: true, trim: true },
    // 包含资源的个数
    count: { type: Number, default: 0 },
    // 是否发布
    is_publish: { type: Boolean, default: false },
    // 谁创建的资源类别
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("SourceCategory", sourceCategorySchema);
