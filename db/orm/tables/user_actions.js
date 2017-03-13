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
const transformRepresentative = transformer(require('./representatives'))

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

function transformForTable(tableName, item) {
  let params = Object.keys(item).reduce((acc, key) => {
    const prefix = `${tableName}_`
    if (key.startsWith(prefix)) {
      acc[key.replace(prefix, '')] = item[key]
    }

    return acc
  }, {})

  return transformer(require(`./${tableName}`)).forObject(params)
}

module.exports = Object.assign(require('../base')(table), {
  searchWithRepresentatives: (params) => {
    const paramsForRep = transformRepresentative.forRecord(params)

    const repParams = Object.keys(paramsForRep).reduce((acc, key) => {
      acc[`representatives.${key}`] = paramsForRep[key]

      return acc
    }, {})

    return knex('user_actions').select(selects)
      .leftJoin('representatives', 'user_actions.representative_id', '=', 'representatives.id')
      .leftJoin('actions', 'user_actions.action_id', '=', 'actions.id')
      .leftJoin('issues', 'user_actions.issue_id', '=', 'issues.id')
      .where(repParams)
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
