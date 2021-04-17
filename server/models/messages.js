const { Schema, model } = require("mongoose");

// 游客
const messageSchema = new Schema(
  {
    // 内容
    content: { type: String, required: true },
    // 类型 是留言板留言还是文章留言
    article: { type: Schema.Types.ObjectId, ref: "Article", required: false, default: null },
    // 子留言
    children: {
      type: [{ type: Schema.Types.ObjectId, ref: "Message", default: null }],
      default: []
    },
    // 回复哪条留言
    message: { type: Schema.Types.ObjectId, ref: "Message", default: null },
    // 谁创建的留言
    visitor: { type: Schema.Types.ObjectId, ref: "Visitor", default: null },
    // 哪个作者的留言
    create_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
