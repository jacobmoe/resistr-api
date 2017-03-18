const buildSchema = (table) => {
  return Object.assign({}, table.schema, {
    columns: Object.values(table.schema.columnMap)
  })
}

module.exports = {
  users: buildSchema(require('./users')),
  user_actions: buildSchema(require('./user_actions')),
  actions: buildSchema(require('./actions')),
  issues: buildSchema(require('./issues')),
  representatives: buildSchema(require('./representatives'))
}
