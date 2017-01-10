const Koa = require('koa')
const Router = require('koa-router')
const propublica = require('./sources/propublica')

const app = new Koa()
const router = new Router()

function house () {
  return async function (ctx) {
    const result = await propublica.congress.house.members()
    ctx.body = result.body
  }
}

router.get('/house', house())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
