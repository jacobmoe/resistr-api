const Koa = require('koa')
const Router = require('koa-router')
const sunlight = require('./sources/sunlight')
const house = require('./house/routes')
const senate = require('./senate/routes')

const app = new Koa()
const router = new Router()

function legislators () {
  return async function (ctx) {
    const result = await sunlight.legislators(ctx.query.zip)
    ctx.status = 200
    ctx.body = result.body
  }
}

router.get('/legislators', legislators())
router.use('/house', house.routes(), house.allowedMethods())
router.use('/senate', senate.routes(), senate.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

console.log("API/CONGRESS ROUTES\n", router.stack.map(i => i.path).join("\n"))

module.exports = app
