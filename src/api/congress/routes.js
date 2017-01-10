const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')
const utils = require('../lib/utils')

const app = new Koa()
const router = new Router()

function house () {
  return async function (ctx) {
    const result = await utils.request({
      method: "GET",
      url: "https://api.propublica.org/congress/v1/114/house/members.json",
      headers: {
        'X-API-Key': config.get('propublicaApiKey')
      }
    })

    ctx.body = result.body
  }
}

router.get('/house', house())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
