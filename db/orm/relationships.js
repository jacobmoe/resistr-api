const pluralize = require('pluralize')

const knex = require('../connection')
const tables = require('./tables')
const transformer = require('./transform')

const buildSelects = (tableInfo, belongsToTables) => {
  const selects = belongsToTables.reduce((acc, tableName) => {
    const relationTable = tables[tableName]

    Object.values(relationTable.schema.columnMap).forEach((column) => {
      acc.push( `${tableName}.${column} AS ${tableName}_${column}`)
    })

    return acc
  }, [])

  selects.push(`${tableInfo.name}.*`)

  return selects
}

function transformWithTableForObject(tableName, item) {
  let params = Object.keys(item).reduce((acc, key) => {
    const prefix = `${tableName}_`
    if (key.startsWith(prefix)) {
      acc[key.replace(prefix, '')] = item[key]
    }

    return acc
  }, {})

  return transformer(tables[tableName]).paramsForObject(params)
}

const joinForBelongsTo = (relation, tableInfo, relationTableName) => {
  // knex leftJoin args look like
  // leftJoin('relationTable', 'table.foreign_key', '=', 'relationTable.id')
  return relation.leftJoin(
    relationTableName,
    `${tableInfo.name}.${pluralize.singular(relationTableName)}_id`,
    '=',
    `${relationTableName}.id`
  )
}

module.exports = (tableInfo, relationships) => {
  const belongsToTables = relationships.belongsTo || []

  const where = (params) => {
    const transform = transformer(tableInfo)
    const selects = buildSelects(tableInfo, belongsToTables)

    let relation = knex(tableInfo.name).select(selects)
    belongsToTables.forEach((relationTableName) => {
      relation = joinForBelongsTo(relation, tableInfo, relationTableName)
    })

    if (params.createdAfter) {
      relation = relation.where(`${tableInfo.name}.created_at`, '>', params.createdAfter)
      delete params.createdAfter
    }

    return relation
      .where(transform.buildSearchParams(params))
      .then((res) => {
        return res.map((item) => {
          const object = transform.paramsForObject(item)

          return Object.assign({}, object, belongsToTables.reduce((acc, name) => {
            acc[pluralize.singular(name)] = transformWithTableForObject(name, item)

            return acc
          }, {}))
        })
      })
  }

  return {
    where
  }
}
