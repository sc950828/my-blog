const { Schema, model } = require("mongoose");

// 资源
const sourceSchema = new Schema(
  {
    // name
    title: { type: String, required: true, trim: true },
    // link 资源地址
    link: { type: String, required: true, trim: true },
    // logo 资源logo
    logo: { type: String, trim: true, default: "https://xiaosu72.oss-cn-shanghai.aliyuncs.com/blog/images/upload_adb7032cf3270acd358a95361fecd375.svg" },
    // 描述
    description: { type: String, required: true, trim: true },
    // 是否发布
    is_publish: { type: Boolean, default: false },
    // 属于哪个分类的资源
    source_category: { type: Schema.Types.ObjectId, ref: "SourceCategory", required: true },
    // 分类名
    source_category_name: { type: String, required: true },
    // 谁创建的素材
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Source", sourceSchema);
