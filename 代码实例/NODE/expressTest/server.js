const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const todoController = require("./controller/todoController")

const app = express()

mongoose.connect("mongodb://localhost:27017/expressTest", { useNewUrlParser: true }).then(res => {
  console.log('mongodb connect')
}).catch(err => {
  console.log('mongodb connect error')
})

//设置模板引擎 先安装ejs
app.engine('.html', require('ejs').__express);
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("./public"))

todoController(app)

app.listen(8888, function () {
  console.log("server running...")
})