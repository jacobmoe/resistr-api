const _ = require('lodash')

module.exports = (tableInfo) => {
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
