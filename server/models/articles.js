const { Schema, model } = require("mongoose");

// 文章
const articleSchema = new Schema(
  {
    // 标题
    title: { type: String, required: true, trim: true },
    // 内容
    content: { type: String, required: true },
    // 文章图
    banner: {
      type: String,
      default: "http://xiaosu72.oss-cn-shanghai.aliyuncs.com/randy.jpg",
    },
    // 评论数
    comments: { type: Number, default: 0 },
    // 浏览量
    views: { type: Number, default: 0 },
    // 是否发布
    is_publish: { type: Boolean, default: false },
    // 属于哪个分类
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    // 谁发布的
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Article", articleSchema);
