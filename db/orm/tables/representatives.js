const schema = {
  name: 'representatives',
  columnMap: {
    id: 'id',
    name: 'name',
    officeName: 'office_name',
    ocdDivisionIdentifier: 'ocd_division_identifier',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const load = () => {
  return Object.assign(require('../crud')(schema), schema, {

  })

}

module.exports = { schema, load }
