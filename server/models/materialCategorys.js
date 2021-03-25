const { Schema, model } = require("mongoose");

// 素材类别
const materialCategorySchema = new Schema(
  {
    // name
    name: { type: String, required: true, trim: true },
    // 包含素材的个数
    count: { type: Number, default: 0 },
    // 谁创建的素材类别
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("MaterialCategory", materialCategorySchema);
