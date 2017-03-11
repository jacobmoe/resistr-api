const knex = require('../connection')

module.exports = (table, instance, foreignKey) => {
  return {
    hasMany: knex(table.name).where({[foreignKey]: instance.id}),
    belongsTo: null
  }
}
