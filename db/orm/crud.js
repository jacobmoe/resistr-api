const knex = require('../connection')

module.exports = (tableInfo) => {
  const transform = require('./transform')(tableInfo)

  return {
    count: () => {
      return knex(tableInfo.name).count().limit(1).then((result) => {
        return result[0].count
      })
    },
    find: (id) => {
      return knex(tableInfo.name).select().where('id', id)
        .then((result) => {return transform.forObject(result[0])})
    },
    create: (params) => {
      const record = transform.forRecord(params)

      return knex(tableInfo.name).insert(record, '*')
        .then((result) => {
          return transform.forObject(result[0])
        })
    }
  }
}
