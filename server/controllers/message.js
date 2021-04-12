const Message = require("../models/messages");
const Visitor = require("../models/visitors");
const Article = require("../models/articles");
// const { checkIsAdmin } = require("../utils/help");
// const mongoose = require("mongoose");

class MessageCtrl {
  // 查找
  async findWeb(ctx) {
    const { pageNo = 1, pageSize = 10, articleId } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 默认查一级
    let query = { create_by: ctx.state.user.id, message: null , article: null };
    let countQuery = { create_by: ctx.state.user.id, article: null };
    if(articleId) {
      query.article = articleId;
      countQuery.article = articleId;
    }
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate({
        path: "visitor children",
        populate: {
          path: 'visitor message',
          populate: {
            path: 'visitor message'
          }
        }
      });

    const total = await Message.find(countQuery).countDocuments();
    ctx.body = { messages, total, pageNo: _pageNo, pageSize: _pageSize };
  }

  // 保存留言
  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true, max: 200 },
      name: { type: "string", required: true, max: 10 },
      email: { type: "email", required: true },
    });
    const { content, name, email, articleId, messageId, parentMessageId } = ctx.request.body;
    let visitor = null;
    visitor = await Visitor.findOne({ name, email });
    if(!visitor) {
      visitor = await new Visitor({ name, email, create_by: ctx.state.user.id }).save();
    }
    let message = null;
    const newMessage = await new Message({
      content,
      article: articleId,
      message: messageId,
      visitor: visitor._id,
      create_by: ctx.state.user.id
    }).save();
    // 一级留言
    if(parentMessageId) {
      // $pull删除 $push添加
      message = await Message.findByIdAndUpdate(
        parentMessageId,
        { "$push" : { children: newMessage._id } },
        {
          new: true,
        }
      );
    }
    // 增加留言量
    await Article.findByIdAndUpdate(
      articleId,
      { $inc: { comments: 1 } },
      { new: true });

    ctx.body = message;
  }
}

module.exports = new MessageCtrl();
