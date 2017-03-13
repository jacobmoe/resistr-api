const modelFactory = require('../lib/factories/model')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm/tables/user_actions')

const validations = {
  userId: [
    validationFactory.presence('userId')
  ],
  actionId: [
    validationFactory.presence('actionId')
  ],
  issueId: [
    validationFactory.presence('issueId')
  ],
  issueId: [
    validationFactory.presence('issueId')
  ],
  representativeId: [
    validationFactory.presence('representativeId')
  ]
}

const UserAction = modelFactory(table, validations)

UserAction.classDef('where', async (params) => {
  const res = table.whereWithAssociations(params)
  return res && res.map((item) => (UserAction.build(item)))
})

module.exports = UserAction
