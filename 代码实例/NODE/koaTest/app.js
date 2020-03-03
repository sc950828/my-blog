const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())//post提交参数问题 这个必须在上面
app.use(router.routes()).use(router.allowedMethods())

const peoples = [{name: 'randy', age: 23}, {name: 'demi', age: 24}]

//模板引擎配置
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',//模板是layout.html 是一个模板，每个页面都会自动加上
  viewExt: 'html',//html文件
  cache: false, //不缓存
  debug: false
})

router.get('/', index)

async function index (ctx) {
  await ctx.render('index', {
    name: 'randy',//传递的数据
    peoples: peoples
  })
}

router.get('/add', add)

async function add (ctx) {
  await ctx.render('add')
}

router.post('/add', addPeople)

async function addPeople (ctx) {
  const item = ctx.request.body
  peoples.push(item)
  ctx.redirect('/')
}

app.listen(8080, () => {
  console.log("server running...")
})