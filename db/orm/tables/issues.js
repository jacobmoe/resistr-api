const schema = {
  name: 'issues',
  columnMap: {
    id: 'id',
    name: 'name',
    description: 'description',
    iconName: 'icon_name',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const load = () => {
  return require('../buildTable')(schema, {

  })
}

module.exports = { schema, load }
