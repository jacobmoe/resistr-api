const modelFactory = require('../lib/model')
const validationFactory = require('../lib/validations')

const tableName = 'users'

const validations = {
  name: [
    validationFactory.presence('name')
  ],
  encryptedPassword: [
    validationFactory.presence('encryptedPassword')
  ]
}

module.exports = modelFactory(tableName, validations)
