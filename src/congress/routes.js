const Koa = require('koa')
const Router = require('koa-router')
const sunlight = require('./sources/sunlight')
const house = require('./house/routes')
const senate = require('./senate/routes')

const app = new Koa()
const router = new Router()

router.use('/house', house.routes(), house.allowedMethods())
router.use('/senate', senate.routes(), senate.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

console.log(
  "API/CONGRESS ROUTES:\n",
  router.stack.map(i => i.path).join("\n")
)

module.exports = app
