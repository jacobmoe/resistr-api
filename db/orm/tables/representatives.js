const table = {
  name: 'representatives',
  columns: {
    id: 'id',
    name: 'name',
    officName: 'office_name',
    ocdDivisionIdentifier: 'ocd_division_identifier',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

module.exports = Object.assign(require('../base')(table), {})
