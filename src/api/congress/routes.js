const Koa = require('koa')
const router = new require('koa-router')();

const app = new Koa()

function senate () {
  return async function (ctx, next) {
    next()
    ctx.body = "api/congress/routes"
  }
}

router.get('/senate', senate())

app.use(router.routes()).use(router.allowedMethods())


module.exports = app
