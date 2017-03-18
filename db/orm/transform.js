const _ = require('lodash')
const pluralize = require('pluralize')

const transformer = (tableInfo) => {
  return {
    forObject: (params) => {
      if (!params) return null

      return Object.keys(params).reduce((acc, key) => {
        let attrName = _.findKey(tableInfo.columnMap, (value) => {
          return value === key
        })

        if (attrName) acc[attrName] = params[key]

        return acc
      }, {})
    },
    forRecord: (params) => {
      if (!params) return null

      return Object.keys(params).reduce((acc, key) => {
        if (tableInfo.columnMap[key]) {
          acc[tableInfo.columnMap[key]] = params[key]
        }

        return acc
      }, {})
    }
  }
}

const transformerForTable = (tableName) => {
  try {
    return transformer(require(`./tables/${tableName}`))
  } catch (err) {}
}

/* takes something like
*
* userActionParams = {
*   userId: '1',
*   representative: {
*    ocdDivisionIdentifier: 'ocd-division/country:us',
*    officeName: 'President of the United States',
*    name: 'He Who Must Not Be Named'
*  }
* }
*
* and transforms it into
*
* {
*    'user_actions.user_id': '1',
*    'representatives.ocd_division_identifier': 'ocd-division/country:us',
*    'representatives.office_name': 'President of the United States',
*    'representatives.name': 'He Who Must Not Be Named'
*  }
*/
function buildSearchParams(tableInfo) {
  return (params) => {
    return Object.keys(params).reduce((acc, key) => {
      if (typeof params[key] == 'object') {
        const relationTableName = pluralize.plural(key)
        const relationTransformer = transformerForTable(relationTableName)

        if (relationTransformer) {
          const record = relationTransformer.forRecord(params[key])

          let fields = Object.keys(record).reduce((recordAcc, recordKey) => {
            recordAcc[`${relationTableName}.${recordKey}`] = record[recordKey]

            return recordAcc
          }, {})

          Object.assign(acc, fields)
        }
      } else {
        if (tableInfo.columnMap[key]) {
          acc[`${tableInfo.name}.${tableInfo.columnMap[key]}`] = params[key]
        }
      }

      return acc
    }, {})
  }
}

module.exports = (tableInfo) => {
  return {
    forObject: transformer(tableInfo).forObject,
    forRecord: transformer(tableInfo).forRecord,
    buildSearchParams: buildSearchParams(tableInfo)
  }
}