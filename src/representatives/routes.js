const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const civicInfo = require('./sources/civicInfo')
const builder = require('./builder')

function index () {
  return async function (ctx) {
    const results = await civicInfo.search(ctx.query.address)
    const body = JSON.parse(results.body)

    ctx.status = 200
    ctx.body = JSON.stringify(builder.build(body))
  }
}

router.get('/', index())

app.use(router.routes()).use(router.allowedMethods)

console.log(
  "API/REPRESENTATIVES ROUTES\n",
  router.stack.map(i => i.path).join("\n")
)

module.exports = app
