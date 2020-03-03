const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const users = require('./routes/api/users')

//mongoose用来连接mongodb数据库
mongoose.connect('mongodb://localhost:27017/xiaosu', { useNewUrlParser: true }).then(res => {
  console.log('mongodb connect to xiaosu success')
}).catch(err => {
  console.log('mongodb connect error')
})

router.use('/api/users', users)
app.use(bodyParser())//post提交参数问题 这个必须在上面
app.use(router.routes()).use(router.allowedMethods())


app.listen(5000, () => {
  console.log("server running...")
})
