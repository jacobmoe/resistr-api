const sunlight = require('../sources/sunlight')

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
    const senators = await sunlight.districtMembers({
      state: ctx.params.state.toUpperCase(),
      chamber: 'senate'
    })

    ctx.status = 200
    ctx.body = senators.body
  }
}

module.exports = {
  index,
  members
}
