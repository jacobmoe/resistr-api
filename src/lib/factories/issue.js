const modelFactory = require('./model')
const validationFactory = require('../validations')
const table = require('../../../db/orm').issues

module.exports = (validations = {}, builder = (inst => inst)) => {
  validations = Object.assign({}, {
    name: [
      validationFactory.presence('name'),
      validationFactory.unique('name')
    ]
  }, validations)

  const instanceBuilder = (instance) => {
    // add shared instance methods here

    return builder(instance)
  }


  return modelFactory(table, validations, instanceBuilder)
}
