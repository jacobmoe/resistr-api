const modelFactory = require('../lib/modelFactory')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm/tables/actions')

const validations = {
  name: [
    validationFactory.presence('name'),
    validationFactory.unique('name')
  ]
}

const Action = modelFactory(table, validations)

module.exports = Action
