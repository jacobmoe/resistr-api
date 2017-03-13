const table = {
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

module.exports = Object.assign(require('../base')(table), {})
