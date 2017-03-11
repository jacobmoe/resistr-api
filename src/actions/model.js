const modelFactory = require('../lib/modelFactory')
const validationFactory = require('../lib/validations')
const actionsTable = require('../../db/orm/tables/actions')

const validations = {
  name: [
    validationFactory.presence('name')
  ]
}

const Action = modelFactory(actionsTable, validations)

module.exports = Action
