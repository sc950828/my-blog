const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

// 都会执行 传递数组函数
var cb0 = function(req, res, next) {
  console.log("cb0 start");
  next();
  console.log("cb0 end");
};

var cb1 = async function(req, res, next) {
  console.log("cb1 start");
  next();
  await sleep(2000);
  console.log("cb1 end");
};

var cb2 = function(req, res) {
  console.log("cb2 start");
  res.end("cb2");
  console.log("cb2 end");
};

// 执行的顺序是 cb0start cb1start cb1end cb0end
app.get("/index", [cb0, cb1, cb2]);

// get请求 获取query
app.get("/index2", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.end("index2");
});

// post请求
app.post("/index3", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.end("index3");
});

// 测试json 返回json
app.get("/json", (req, res) => {
  res.json({ name: "randy" });
});

// 测试params
app.get("/params/:id", (req, res) => {
  res.json({ id: req.params.id });
});

// 拆分出去的路由
const user = require("./router/user");
app.use("/users", user);

// 静态文件
app.use("/public", express.static(__dirname + "/public"));

// 模拟sleep
const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

app.get("/sleep", async (req, res) => {
  console.time("time");
  await sleep(2000);
  console.timeEnd("time");
  res.end("hello");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
