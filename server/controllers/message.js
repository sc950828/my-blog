const Message = require("../models/messages");
const Article = require("../models/articles");
const jsonwebtoken = require("jsonwebtoken");
const { initSecret } = require("../utils/secret");
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
    });
    // visitor不一定有 管理员后台回复的留言就没有
    let visitor = null;
    if(ctx.request.headers.token) {
      // 解析token 获取用户信息
      const { token } = ctx.request.headers;
      const secret = await initSecret();
      visitor = jsonwebtoken.verify(token, secret);
    }
    const { content, articleId, messageId, parentMessageId } = ctx.request.body;

    const message = await new Message({
      content,
      article: articleId,
      message: messageId,
      visitor: visitor ? visitor.id : null,
      create_by: ctx.state.user.id
    }).save();
    // 一级留言
    if(parentMessageId) {
      // $pull删除 $push添加
      await Message.findByIdAndUpdate(
        parentMessageId,
        { "$push" : { children: message._id } },
        {
          new: true,
        }
      );
    }
    if(articleId) {
      // 增加留言量
      await Article.findByIdAndUpdate(
        articleId,
        { $inc: { comments: 1 } },
        { new: true });
    }

    ctx.body = message;
  }
}

module.exports = new MessageCtrl();
