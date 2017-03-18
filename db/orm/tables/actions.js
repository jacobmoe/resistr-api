const schema = {
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

const load = () => { 
  return Object.assign({}, require('../crud')(schema), schema, {

  })
}

module.exports = { schema, load }
