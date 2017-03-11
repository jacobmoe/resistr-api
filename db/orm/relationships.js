const knex = require('../connection')

function hasMany (foreignTableName, foreignKey) {
  return function (id) {
    return {
      [foreignTableName]: knex(foreignTableName).where({[foreignKey]: id})
    }
  }
}

module.exports = {
  hasMany
}
