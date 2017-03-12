const bcrypt = require('bcrypt')

const modelFactory = require('../lib/factories/model')
const validationFactory = require('../lib/validations')
const table = require('../../db/orm/tables/users')

const tableName = 'users'

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

const User = modelFactory(table, validations, (instance) => {
  instance.prepare = () => {
    const params = Object.assign({}, instance.params)
    delete params.encryptedPassword
    delete params.createdAt
    delete params.updatedAt

    return params
  }

  instance.validatePassword = async (password) => {
    try {
      return await bcrypt.compare(
        password,
        instance.encryptedPassword
      )
    } catch (err) {
      return Promise.reject('Error checking password')
    }
  }

  return instance
})

const factoryCreate = User.create
User.classDef('create', async (params) => {
  const obj = User.build(params)
  const errors = obj.validationErrors()

  if (Object.keys(errors).length > 1) {
    return Promise.reject(errors)
  }

  try {
    const hash = await bcrypt.hash(obj.password, 10)
    params.encryptedPassword = hash
  } catch (err) {
    throw { password: ['invalid'] }
  }

  return await factoryCreate(params)
})

module.exports = User
