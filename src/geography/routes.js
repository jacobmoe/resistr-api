const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const mapzen = require('./sources/mapzen')

function addresses () {
  return async function (ctx) {
    let focus

    if (ctx.query.focuslat && ctx.query.focuslon) {
      focus = {
        lat: ctx.query.focuslat,
        lon: ctx.query.focuslon
      }
    }

    const results = await mapzen.search(ctx.query.term, focus)
    ctx.status = 200
    ctx.body = results.body
  }
}

router.get('/addresses', addresses())

app.use(router.routes()).use(router.allowedMethods())

console.log(
  "API/GEOGRAPHY ROUTES\n",
  router.stack.map(i => i.path).join("\n")
)

module.exports = app
