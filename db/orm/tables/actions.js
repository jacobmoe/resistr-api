const table = {
  name: 'actions',
  columns: {
    id: 'id',
    name: 'name',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

module.exports = Object.assign(require('../base')(table), {})
