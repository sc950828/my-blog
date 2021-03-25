const { Schema, model } = require("mongoose");

// 文章
const articleSchema = new Schema(
  {
    // 标题
    title: { type: String, required: true, trim: true },
    // 描述
    description: { type: String, required: true, trim: true },
    // 内容
    content: { type: { mdValue: { type: String }, htmlValue: { type: String } }, required: true, select: false },
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
    article_category: { type: Schema.Types.ObjectId, ref: "ArticleCategory", required: true },
    // 谁发布的
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Article", articleSchema);

// // 生日
// birthday: { type: Date, required: false },
// // 户籍所在地点
// origin_locations: {
//   type: [{ type: String }],
//   required: false,
//   select: false,
// },
// // 目前所在地点
// locations: { type: [{ type: String }], required: false, select: false },
// // 工作经历
// employments: {
//   type: [
//     {
//       company: { type: String },
//       job: { type: String },
//       startTime: { type: Date },
//       endTime: { type: Date },
//     },
//   ],
//   required: false,
//   select: false,
// },
// // 教育经历
// educations: {
//   type: [
//     {
//       school: { type: String }, // 学校
//       major: { type: String }, // 专业
//       diploma: { type: Number, enum: [1, 2, 3, 4, 5] }, // 学历
//       entrance_year: { type: Number }, // 入学年份
//       graduation_year: { type: Number }, // 毕业年份
//     },
//   ],
//   required: false,
//   select: false,
// }
