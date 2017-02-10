const propublica = require('../sources/propublica')

const Router = require('koa-router')
const districts = require('./districts/routes')

const router = new Router()

function index () {
  return async function (ctx) {
    const result = await propublica.congress.house.members()
    ctx.body = result.body
  }
}

router.get('/index', index())
router.use('/districts', districts.routes(), districts.allowedMethods())

module.exports = router
