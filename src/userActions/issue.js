const modelFactory = require('../lib/modelFactory')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm/tables/issues')

const validations = {
  name: [
    validationFactory.presence('name'),
    validationFactory.unique('name')
  ]
}

const Issue = modelFactory(table, validations)

module.exports = Issue
