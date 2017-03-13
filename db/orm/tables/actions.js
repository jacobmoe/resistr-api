const table = {
  name: 'actions',
  columnMap: {
    id: 'id',
    name: 'name',
    description: 'description',
    iconName: 'icon_name',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

module.exports = Object.assign(require('../base')(table), {})
