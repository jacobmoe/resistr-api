const base = require('./base')

const buildSchema = (schema) => {
  return Object.assign({}, schema, {
    columns: Object.values(schema.columnMap)
  })
}

module.exports = (schema, methods) => {
  schema = buildSchema(schema)
  return Object.assign({}, base(schema), schema, methods)
}
