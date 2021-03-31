const TimeLine = require("../models/timeLines");
const mongoose = require("mongoose");

class TimeLineCtrl {
  // 查找
  async findWeb(ctx) {
    const { pageNo = 1, pageSize = 10 } = ctx.query;
    const _pageNo = Math.max(pageNo * 1, 1);
    const _pageSize = Math.max(pageSize * 1, 1);
    // 这里需要转成ObjectId
    const query = { user: mongoose.Types.ObjectId( ctx.state.user.id) };

    const timeLines = await TimeLine.find(query)
      .sort({ createdAt: 'desc' })
      .limit(_pageSize)
      .skip((_pageNo - 1) * _pageSize)
      .populate("article");
    // const timeLines = await TimeLine.aggregate([
    //   { $match: query },
    //   { $lookup: { from: 'articles', localField: 'article', foreignField: '_id', as: 'article' } },
    //   {
    //     $group: { _id: '$year', lists: { $push: "$$ROOT" } }
    //   },
    // ]);
    const total = await TimeLine.find().countDocuments(query);
    ctx.body = { timeLines, total, pageNo: _pageNo, pageSize: _pageSize };
  }

}

module.exports = new TimeLineCtrl();
