const modelFactory = require('../lib/modelFactory')
const validationFactory = require('../lib/validations')
const actionsTable = require('../../db/orm/tables/user_actions')

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

const UserAction = modelFactory(actionsTable, validations)

module.exports = UserAction
