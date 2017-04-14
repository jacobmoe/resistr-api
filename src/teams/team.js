const modelFactory = require('../lib/factories/model')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm').teams

const validations = {
  name: [
    validationFactory.presence('name'),
    validationFactory.unique('name')
  ]
}

const Team = modelFactory(table, validations)

module.exports = Team
