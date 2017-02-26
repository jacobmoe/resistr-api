const table = {
  name: 'users',
  columns: {
    id: 'id',
    name: 'name',
    email: 'email',
    encryptedPassword: 'encrypted_password',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

module.exports = Object.assign(require('./crud')(table), {

})
