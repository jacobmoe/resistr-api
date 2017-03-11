const UserAction = require('./userAction')
const Representative = require('./representative')
const Issue = require('./issue')
const Action = require('./action')

function create () {
  return async (ctx) => {
    const body = ctx.request.body
    const user = ctx.state.user

    try {
      const rep = await Representative.findOrCreate(body.representative)
      const issue = await Issue.find(body.issueId)
      const action = await Action.find(body.actionId)

      if (issue && action) {
        const userAction = await UserAction.create({
          userId: user.id,
          issueId: issue.id,
          actionId: action.id,
          representativeId: rep.id
        })

        ctx.status = 201
        ctx.body = userAction.prepare()
      } else {
        ctx.status = 400
        ctx.body = {issueId: ['invalid issue or action']}
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}

module.exports = {
  create
}
