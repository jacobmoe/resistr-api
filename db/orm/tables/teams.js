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
  return Object.assign(require('../crud')(schema), schema, {

  })
}

module.exports = { schema, load }
