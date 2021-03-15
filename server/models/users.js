const { Schema, model } = require("mongoose");

// 用户
const userSchema = new Schema(
  {
    // 账号
    name: { type: String, required: true, trim: true },
    // 姓名
    nick_name: { type: String, required: false, trim: true },
    // 密码 不想被查询到使用 select: false
    password: { type: String, required: true, select: false },
    // 邮箱
    email: { type: String, required: true },
    // 手机
    phone: { type: String, required: false },
    // 头像
    avatar_url: { type: String, default: "https://xiaosu72.oss-cn-shanghai.aliyuncs.com/blog/images/upload_8ec88423ab91c4fb3387aebf37f0364b.jpg" },
    // 是否是管理员否则就是创作者
    is_admin: { type: Boolean, default: false },
    // 性别
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    // 生日
    birthday: { type: Date, required: false },
    // 简介
    headline: { type: String, required: false, select: false },
    // 户籍所在地点
    origin_locations: {
      type: [{ type: String }],
      required: false,
      select: false,
    },
    // 目前所在地点
    locations: { type: [{ type: String }], required: false, select: false },
    // 工作经历
    employments: {
      type: [
        {
          company: { type: String },
          job: { type: String },
          startTime: { type: Date },
          endTime: { type: Date },
        },
      ],
      required: false,
      select: false,
    },
    // 教育经历
    educations: {
      type: [
        {
          school: { type: String }, // 学校
          major: { type: String }, // 专业
          diploma: { type: Number, enum: [1, 2, 3, 4, 5] }, // 学历
          entrance_year: { type: Number }, // 入学年份
          graduation_year: { type: Number }, // 毕业年份
        },
      ],
      required: false,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
