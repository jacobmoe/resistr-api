const Router = require('koa-router')

const propublica = require('../../sources/propublica')
const sunlight = require('../../sources/sunlight')

const router = new Router()

function processParams() {
  return async function (ctx, next) {
    const districtInfo = ctx.params.district.split("-")

    if (districtInfo.length < 2) {
      ctx.status = 422
      ctx.body = {
        error: 'Invalid district'
      }
    } else {
      ctx.params.state = districtInfo[0]
      ctx.params.district = districtInfo[1]
      await next()
    }
  }
}

function index () {
  return async function (ctx) {
    const result = await sunlight.districts(ctx.query.zip)
    ctx.status = 200
    ctx.body = result.body
  }
}

function members () {
  return async function (ctx) {
    const reps = await sunlight.districtMembers({
      state: ctx.params.state.toUpperCase(),
      district: ctx.params.district,
      chamber: 'house'
    })

    ctx.status = 200
    ctx.body = reps.body
  }
}

router.get('/', index())
router.get('/:district/members', processParams(), members())

module.exports = router
