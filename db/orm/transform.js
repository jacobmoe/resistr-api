const _ = require('lodash')
const pluralize = require('pluralize')
const tables = require('./tables')

const transformer = (tableInfo) => {
  tableInfo = tableInfo.schema || tableInfo

  return {
    paramsForObject: (params) => {
      if (!params) return null

      return Object.keys(params).reduce((acc, key) => {
        let attrName = _.findKey(tableInfo.columnMap, (value) => {
          return value === key
        })

        if (attrName) acc[attrName] = params[key]

        return acc
      }, {})
    },
    paramsForRecord: (params) => {
      if (!params) return null

      return Object.keys(params).reduce((acc, key) => {
        if (tableInfo.columnMap[key]) {
          acc[tableInfo.columnMap[key]] = params[key]
        }

        return acc
      }, {})
    },
    colNameToAttrName: (columnName) => {
      return _.findKey(tableInfo.columnMap, (value) => {
        return value === columnName
      })
    },
    attrNameToColName: (name) => {
      return tableInfo.columnMap[name]
    }
  }
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
  tableInfo = tableInfo.schema || tableInfo

  return (params) => {
    return Object.keys(params).reduce((acc, key) => {
      if (typeof params[key] == 'object') {
        const relationTableName = pluralize.plural(key)

        if (tables[relationTableName]) {
          const relationTransformer = transformer(tables[relationTableName])

          if (relationTransformer) {
            const record = relationTransformer.paramsForRecord(params[key])

            let fields = Object.keys(record).reduce((recordAcc, recordKey) => {
              recordAcc[`${relationTableName}.${recordKey}`] = record[recordKey]

              return recordAcc
            }, {})

            Object.assign(acc, fields)
          }
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
    paramsForObject: transformer(tableInfo).paramsForObject,
    paramsForRecord: transformer(tableInfo).paramsForRecord,
    colNameToAttrName: transformer(tableInfo).colNameToAttrName,
    attrNameToColName: transformer(tableInfo).attrNameToColName,
    buildSearchParams: buildSearchParams(tableInfo)
  }
}
