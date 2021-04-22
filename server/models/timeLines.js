const { Schema, model } = require("mongoose");

// 设置
const timeLineSchema = new Schema(
  {
    // 文章年份
    year: { type: String, required: true, trim: true },
    // 文章月 日
    time: { type: String, required: true, trim: true },
    // 用户id
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // 文章id
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
    // 状态
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("TimeLine", timeLineSchema);
