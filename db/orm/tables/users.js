const schema = {
  name: 'users',
  columnMap: {
    id: 'id',
    name: 'name',
    email: 'email',
    encryptedPassword: 'encrypted_password',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const load = () => {
  return require('../buildTable')(schema, {

  })
}

module.exports = { schema, load }
