const { Schema, model } = require("mongoose");

// 素材
const materialSchema = new Schema(
  {
    // name
    name: { type: String, required: true, trim: true },
    // 链接
    link: { type: String, required: true, trim: true },
    // 属于哪个分类的素材
    material_category: { type: Schema.Types.ObjectId, ref: "MaterialCategory", required: true },
    // 谁创建的素材
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Material", materialSchema);
