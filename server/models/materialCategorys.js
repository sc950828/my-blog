const { Schema, model } = require("mongoose");

// 素材类别
const materialCategorySchema = new Schema(
  {
    // name
    name: { type: String, required: true, trim: true },
    // 谁创建的素材类别
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("MaterialCategory", materialCategorySchema);
