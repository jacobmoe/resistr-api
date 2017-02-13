const sunlight = require('../sources/sunlight')
const memberBuilder = require('../memberBuilder')

// should return all senators
function index () {
  return async function (ctx) {
    const result = await sunlight.districts(ctx.query.zip)
    ctx.status = 200
    ctx.body = result.body
  }
}

function members () {
  return async function (ctx) {
    const senatorResponse = await sunlight.members({
      state: ctx.params.state.toUpperCase(),
      chamber: 'senate'
    })

    const body = JSON.parse(senatorResponse.body)
    body.results = await memberBuilder.all(body.results || [])

    ctx.status = 200
    ctx.body = body
  }
}

module.exports = {
  index,
  members
}
