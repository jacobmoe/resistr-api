const Koa = require('koa')
const router = new require('koa-router')()

const app = new Koa();

require('./middleware')(app)

router.get('/', function (ctx, next) {
  ctx.body = 'resister API'
})

app.use(router.routes()).use(router.allowedMethods())

require('./routes')(app)

module.exports = app
