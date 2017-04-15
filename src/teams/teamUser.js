const modelFactory = require('../lib/factories/model')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm').teamUsers

const validations = {
  userId: [
    validationFactory.presence('userId'),
    validationFactory.unique('userId', ['teamId'])
  ],
  teamId: [
    validationFactory.presence('teamId')
  ]
}

const TeamUser = modelFactory(table, validations)

module.exports = TeamUser
