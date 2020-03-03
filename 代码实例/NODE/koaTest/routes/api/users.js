const Koa = require('koa')
const KoaRouter = require('koa-router')
const router = new KoaRouter()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerValidator = require('../../validation/registerValidator')


router.get('/test', ctx => {
  ctx.status = 200
  ctx.body = 'randy hello'
})

router.post('/login', async ctx => {
  const findResult = await User.findOne({email: ctx.request.body.email})
  if (!findResult) {
    ctx.body = '用户不存在'
  } else {
    //解密
    const result = await bcrypt.compareSync(ctx.request.body.password, findResult.password)
    if (result) {
      //生成token
      const payload = {name: findResult.name, id: findResult.id, avatar: findResult.avatar}
      const token = jwt.sign(payload, 'secret', {expiresIn: 3600})

      //可以使用这种方法验证token
      const decoded = jwt.verify(token, 'secret');

      ctx.body = {token: 'Bearer ' + token, success: decoded}
    } else {
      ctx.body = '密码错误'
    }
  }
})

router.post('/register', async ctx => {
  //使用validator验证
  const {error, isValid} = registerValidator(ctx.request.body)
  if (!isValid) {
    ctx.body = error
    return
  }
  const findResult = await User.findOne({email: ctx.request.body.email})
  if (findResult) {
    ctx.body = '邮箱已经注册'
  } else {
    const avatar = gravatar.url(ctx.request.body.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    const newUser = new User()
    newUser.name = ctx.request.body.name
    newUser.email = ctx.request.body.email
    newUser.password = ctx.request.body.password
    newUser.avatar = avatar

    //加密密码
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(ctx.request.body.password, salt);
    newUser.password = hash

    newUser.save().then(user => {
      ctx.body = user
    }).catch(err => {
      ctx.body = err
    })
    ctx.body = newUser
  }
})

module.exports = router.routes()