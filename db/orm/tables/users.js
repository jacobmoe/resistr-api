const table = {
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

module.exports = Object.assign(require('../base')(table), {
})
