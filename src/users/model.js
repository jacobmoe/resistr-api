const bcrypt = require('bcrypt')

const modelFactory = require('../lib/model')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm/tables/users')

const tableName = 'users'

const saltRounds = 10

const validations = {
  email: [
    validationFactory.presence('email'),
    validationFactory.unique('email')
  ],
  name: [
    validationFactory.presence('name')
  ],
  password: [
    validationFactory.presence('password')
  ]
}

const User = modelFactory(table, validations)

const factoryCreate = User.create
User.create = async (params) => {
  const obj = User.build(params)
  const errors = obj.validationErrors()

  if (Object.keys(errors).length > 1) {
    return Promise.reject(errors)
  }

  const hash = await bcrypt.hash(obj.password, 10)
  params.encryptedPassword = hash

  return await factoryCreate(params)
}

module.exports = User
