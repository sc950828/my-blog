const Record = require("../models/Record")

module.exports = function (app) {
  app.get("/test", function (req, res) {
    res.send(`您所访问的路径是${req.url}`)
  })

  //获取所有
  app.get("/", (req, res) => {
    Record.find().then(records => {
      res.render("../todos/todo.ejs", { todos: records })
    })
  })

  //新增
  app.post("/todo", function (req, res) {
    const record = new Record({
      content: req.body.content,
      status: req.body.status
    })
    record.save().then(result => {
      res.send({ success: true })
    }).catch(err => {
      res.send({ success: false })
    })
  })

  //完成未完成切换 
  app.put("/updateStatus/:item", function (req, res) {
    Record.findOne({ content: req.params.item }).then(record => {
      record.update({ $set: {status: !record.status}}).then(result => {
        res.send({ success: true })
      })
    }).catch(err => {
      res.send({success: false})
    })
  })

  //删除
  app.delete("/todo/:item", function (req, res) {
    Record.findOneAndRemove({ content: req.params.item }).then(result => {
      res.send({ success: true })
    }).catch(err => {
      res.send({success: false})
    })
  })
}