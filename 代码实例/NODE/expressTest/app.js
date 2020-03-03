const express = require("express")

const app = express()

//设置模板引擎 先安装ejs
app.engine('.html', require('ejs').__express);
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  console.log(req.baseUrl)
  console.log(req.hostname)
  console.log(req.get("Accept-Language"))
  res.send("hello world")
})

//请求路径得看请求方法的顺序，
//如果先 / user /: name再 / user / name这样永远进不了 / user / name这个方法
//如果先/user/name再/user/:name这样。如果请求路径是user/name会进入/user/name这个方法
app.get("/user/:name", (req, res) => {
  res.send(`请求的参数是${req.params.name}`)
})

app.get("/user/name", (req, res) => {
  res.send(`请求的路径是/user/name`)
})

//发送html
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

//ejs
app.get("/ejshome/:name", (req, res) => {
  res.render(__dirname + "/ejs/index.ejs", { name: req.params.name })
})



app.listen(8888)