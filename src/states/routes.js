const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const openstates = require('./sources/openstates')
const memberBuilder = require('./memberBuilder')

function search () {
  return async function (ctx) {
    const result = await openstates.geoSearch(ctx.query)
    const body = JSON.parse(result.body)

    ctx.body = {
      results: memberBuilder.all(body)
    }
  }
}

router.get('/search', search())

app.use(router.routes()).use(router.allowedMethods())

console.log(
  "API/STATES ROUTES:\n",
  router.stack.map(i => i.path).join("\n")
)

module.exports = app
