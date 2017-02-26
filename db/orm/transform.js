const _ = require('lodash')

module.exports = (tableInfo) => {
  return {
    forObject: (params) => {
      return Object.keys(params).reduce((acc, key) => {
        let attrName = _.findKey(tableInfo.columns, (value) => {
          return value === key
        })

        if (params[key]) acc[attrName] = params[key]

        return acc
      }, {})
    },
    forRecord: (params) => {
      return Object.keys(params).reduce((acc, key) => {
        acc[tableInfo.columns[key]] = params[key]

        return acc
      }, {})
    }
  }
}
