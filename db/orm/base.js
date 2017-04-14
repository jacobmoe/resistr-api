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
    count: () => {
      return queries.count().then((result) => {
        return result[0].count
      })
    },
    find: (params) => {
      const record = transform.paramsForRecord(params)

      return queries.where(record).then((result) => {
        return transform.paramsForObject(result[0])
      })
    },
    where: (params) => {
      const record = transform.paramsForRecord(params)

      return queries.where(record).then((result) => {
        return result.map((item) => (transform.paramsForObject(item)))
      })
    },
    search: (attrName, text) => {
      const col = transform.attrNameToColName(attrName)

      return queries.where(col, 'ilike', `%${text}%`).then((result) => {
        return result.map((item) => (transform.paramsForObject(item)))
      })
    },
    create: (params) => {
      return queries.create(transform.paramsForRecord(params))
        .then((result) => {
          return transform.paramsForObject(result[0])
        })
    },
    update: async (id, params) => {
      delete params.id

      await queries.update(id, transform.paramsForRecord(params))
      const updated = await queries.where({id: id})

      return transform.paramsForObject(updated[0])
    },
    del: (id) => {
      return queries.del(id)
        .then((result) => {
          return transform.paramsForObject(result[0])
        })
    }
  }
}
