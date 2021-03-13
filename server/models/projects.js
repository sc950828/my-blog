const { Schema, model } = require("mongoose");

// 项目
const projectSchema = new Schema(
  {
    // 项目名
    name: { type: String, required: true, trim: true },
    // 项目链接
    link: { type: String, required: false },
    // 项目图片
    banner: { type: String, required: true },
    // 项目描述
    description: { type: String, required: false, trim: true },
    // 项目开始时间
    start_date: { type: Date, required: false },
    // 项目结束时间
    end_date: { type: Date, required: false },
    // 谁创建的项目
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);
