const schema = {
  name: 'teams',
  columnMap: {
    id: 'id',
    name: 'name',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const load = () => {
  return require('../buildTable')(schema, {

  })
}

module.exports = { schema, load }
