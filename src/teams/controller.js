const Team = require('./team')
const TeamUser = require('./TeamUser')

function create () {
  return async function (ctx) {
    const body = ctx.request.body
    const user = ctx.state.user

    try {
      const team = await Team.create({
        name: body.name
      })

      const teamUser = await TeamUser.create({
        userId: user.id,
        teamId: team.id,
        isLeader: true
      })

      ctx.status = 201
      ctx.body = team.prepare()
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}

module.exports = {
  create
}
