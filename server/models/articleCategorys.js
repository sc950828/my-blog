const { Schema, model } = require("mongoose");

// 文章类别
const articleCategorySchema = new Schema(
  {
    // 标题
    title: { type: String, required: true, trim: true },
    // 描述
    description: { type: String, required: true , select: false },
    // 首页图
    banner: {
      type: String
    },
    // 文章数
    count: { type: Number, default: 0 },
    // 浏览量
    views: { type: Number, default: 0 },
    // 是否发布
    is_publish: { type: Boolean, default: false },
    // 谁发布的
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("ArticleCategory", articleCategorySchema);
