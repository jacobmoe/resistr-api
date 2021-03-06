const modelFactory = require('../lib/factories/model')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm').representatives

const validations = {
  name: [
    validationFactory.presence('name'),
    validationFactory.unique('name', ['officeName', 'ocdDivisionIdentifier'])
  ],
  officeName: [
    validationFactory.presence('officeName')
  ],
  ocdDivisionIdentifier: [
    validationFactory.presence('ocdDivisionIdentifier')
  ]
}

const Representative = modelFactory(table, validations)

module.exports = Representative
