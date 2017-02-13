const sunlight = require('../../sources/sunlight')

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
    const reps = await sunlight.members({
      state: ctx.params.state.toUpperCase(),
      district: ctx.params.district,
      chamber: 'house'
    })

    ctx.status = 200
    ctx.body = reps.body
  }
}

module.exports = {
  index,
  members
}
