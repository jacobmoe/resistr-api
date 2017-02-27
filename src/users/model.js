class User extends require('../lib/model') {
  constructor (params) {
    super(params)
  }
}

User.tableName = 'users'

User.validations = {
  name: [
    (obj) => {
      if (obj.name) return null
      return 'must be present'
    }
  ]
}

module.exports = User
