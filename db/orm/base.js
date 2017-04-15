const knex = require('../connection')

const queryBuilders = (tableInfo) => {
  return {
    count: () => {
      return knex(tableInfo.name).count()
    },
    select: () => {
      return knex(tableInfo.name).select()
    },
    where: (...args) => {
      return knex(tableInfo.name).select().where(...args)
    },
    create: (params) => {
      return knex(tableInfo.name).insert(params, '*')
    },
    update: (id, params) => {
      return knex(tableInfo.name).where('id', id).update(params)
    },
    del: (id) => {
      return knex(tableInfo.name).where('id', id).del('*')
    }
  }
}

module.exports = (tableInfo) => {
  const transform = require('./transform')(tableInfo)
  const queries = queryBuilders(tableInfo)

  return {
    exec: (query) => {
      return query.then((result) => {
        return result.map((item) => (transform.paramsForObject(item)))
      })
    },
    count: () => {
      return queries.count().then((result) => {
        return result[0].count
      })
    },
    where: (params) => {
      const record = transform.paramsForRecord(params)
      return queries.where(record)
    },
    search: (attrName, text) => {
      const col = transform.attrNameToColName(attrName)
      return queries.where(col, 'ilike', `%${text}%`)
    },
    create: (params) => {
      return queries.create(transform.paramsForRecord(params))
    },
    update: async (id, params) => {
      delete params.id
      await queries.update(id, transform.paramsForRecord(params))

      return queries.where({id: id})
    },
    del: (id) => {
      return queries.del(id)
    }
  }
}
