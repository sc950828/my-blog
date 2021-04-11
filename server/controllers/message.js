const Message = require("../models/messages");
const Visitor = require("../models/visitors");
// const { checkIsAdmin } = require("../utils/help");
// const mongoose = require("mongoose");

class MessageCtrl {
  // 查找
  async findWeb(ctx) {
    const { pageNo = 1, pageSize = 10, articleId } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 默认查一级
    let query = { create_by: ctx.state.user.id };
    if(articleId) {
      query.article = articleId;
    }
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("visitor message children.message children.visitor");

    const total = await Message.find(query).countDocuments();
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
    visitor = await Visitor.findOne({ email });
    if(!visitor) {
      visitor = await new Visitor({ name, email, create_by: ctx.state.user.id }).save();
    }
    let message = null;
    const newMessage = new Message({
      content,
      article: articleId,
      visitor: visitor._id,
      message: messageId,
      create_by: ctx.state.user.id
    });
    // 一级留言
    if(!parentMessageId) {
      message = await newMessage.save();
    } else {
      // $pull删除
      message = await Message.findByIdAndUpdate(
        parentMessageId,
        { "$push" : { children: newMessage } },
        {
          new: true,
        });
    }

    ctx.body = message;
  }
}

module.exports = new MessageCtrl();
