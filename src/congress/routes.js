const Koa = require('koa')
const Router = require('koa-router')
const propublica = require('./sources/propublica')
const sunlight = require('./sources/sunlight')
const districts = require('./districts/routes')

const app = new Koa()
const router = new Router()

function house () {
  return async function (ctx) {
    const result = await propublica.congress.house.members()
    ctx.body = result.body
  }
}

function legislators () {
  return async function (ctx) {
    const result = await sunlight.legislators(ctx.query.zip)
    ctx.status = 200
    ctx.body = result.body
  }
}

router.get('/house', house())
router.get('/legislators', legislators())
router.use('/districts', districts.routes(), districts.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
