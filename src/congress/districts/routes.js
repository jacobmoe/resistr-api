const Router = require('koa-router')

const propublica = require('../sources/propublica')
const sunlight = require('../sources/sunlight')

const router = new Router()

function index () {
  return async function (ctx) {
    const result = await sunlight.districts(ctx.query.zip)
    ctx.status = 200
    ctx.body = result.body
  }
}

function legislators () {
  return async function (ctx) {
    const district = ctx.params.district.split("-")
    if (district.length < 2) {
      ctx.status = 422
      ctx.body = {
        error: 'Invalid district'
      }
    } else {
      const opts = {state: district[0]}
      const senators = await sunlight.districtLegislators(opts)

      opts.district = district[1]
      const reps = await sunlight.districtLegislators(opts)

      const senatorResults = JSON.parse(senators.body)["results"] || []
      const repResults = JSON.parse(reps.body)["results"] || []

      ctx.status = 200
      ctx.body = {
        results: senatorResults.concat(repResults),
        count: senatorResults.length + repResults.length
      }
    }
  }
}

router.get('/', index())
router.get('/:district/legislators', legislators())

module.exports = router
