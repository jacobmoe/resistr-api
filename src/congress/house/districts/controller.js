const sunlight = require('../../sources/sunlight')
const memberBuilder = require('../../memberBuilder')

function index () {
  return async function (ctx) {
    const result = await sunlight.districts({
      lat: ctx.query.lat,
      lon: ctx.query.lon
    })
    ctx.status = 200
    ctx.body = result.body
  }
}

function members () {
  return async function (ctx) {
    const memberResponse = await sunlight.members({
      state: ctx.params.state.toUpperCase(),
      district: ctx.params.district,
      chamber: 'house'
    })

    const body = JSON.parse(memberResponse.body)
    body.results = await memberBuilder.all(body.results || [])

    ctx.status = 200
    ctx.body = body
  }
}

module.exports = {
  index,
  members
}
