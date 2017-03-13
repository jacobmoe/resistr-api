const pluralize = require('pluralize')

const knex = require('../../connection')
const transformer = require('../transform')

const table = {
  name: 'user_actions',
  columnMap: {
    id: 'id',
    userId: 'user_id',
    actionId: 'action_id',
    representativeId: 'representative_id',
    issueId: 'issue_id',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const transform = transformer(table)


// do this dynamically from table columns
// include in a belongsTo relationship builder
const selects = [
  'user_actions.*',
  'representatives.id AS representatives_id',
  'representatives.ocd_division_identifier AS representatives_ocd_division_identifier',
  'representatives.office_name AS representatives_office_name',
  'representatives.name AS representatives_name',
  'actions.id AS actions_id',
  'actions.name AS actions_name',
  'actions.icon_name AS actions_icon_name',
  'issues.id AS issues_id',
  'issues.name AS issues_name'
]

function transformerForTable(tableName) {
  return transformer(require(`./${tableName}`))
}

function transformForTable(tableName, item) {
  let params = Object.keys(item).reduce((acc, key) => {
    const prefix = `${tableName}_`
    if (key.startsWith(prefix)) {
      acc[key.replace(prefix, '')] = item[key]
    }

    return acc
  }, {})

  return transformerForTable(tableName).forObject(params)
}

function buildSearchParams(params) {
  return Object.keys(params).reduce((acc, key) => {
    if (typeof params[key] == 'object') {
      const tableName = pluralize.plural(key)
      const transformer = transformerForTable(tableName)

      const record = transformer.forRecord(params[key])

      let fields = Object.keys(record).reduce((recordAcc, recordKey) => {
        recordAcc[`${tableName}.${recordKey}`] = record[recordKey]

        return recordAcc
      }, {})

      Object.assign(acc, fields)
    } else {
      if (table.columnMap[key]) {
        acc[`user_actions.${table.columnMap[key]}`] = params[key]
      }
    }

    return acc
  }, {})
}

module.exports = Object.assign(require('../base')(table), {
  whereWithAssociations: (params) => {
    const searchParams = buildSearchParams(params)

    // extract into a generic "belongsTo" relationship builder
    return knex('user_actions').select(selects)
      .leftJoin('representatives', 'user_actions.representative_id', '=', 'representatives.id')
      .leftJoin('actions', 'user_actions.action_id', '=', 'actions.id')
      .leftJoin('issues', 'user_actions.issue_id', '=', 'issues.id')
      .where(searchParams)
      .then((res) => {
        return res.map((item) => {
          const userAction = transform.forObject(item)

          return Object.assign({}, userAction, {
            representative: transformForTable('representatives', item),
            action: transformForTable('actions', item),
            issue: transformForTable('issues', item)
          })
        })
      })
  }
})
