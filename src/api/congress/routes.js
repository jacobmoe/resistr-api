const Koa = require('koa')
const router = require('koa-route');

const app = new Koa()

function senate () {
  return async function (ctx, next) {
    next()
    ctx.body = "api/congress/routes"
  }
}

app.use(router.get('/senate', senate()))

module.exports = app
