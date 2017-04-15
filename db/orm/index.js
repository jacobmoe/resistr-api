const buildSchema = (table) => {
  return Object.assign({}, table.schema, {
    columns: Object.values(table.schema.columnMap)
  })
}

const users = require('./tables/users').load()
const userActions = require('./tables/user_actions').load()
const representatives = require('./tables/representatives').load()
const actions = require('./tables/actions').load()
const issues = require('./tables/issues').load()
const teams = require('./tables/teams').load()
const teamUsers = require('./tables/team_users').load()

const tables = require('./tables')

module.exports = {
  users,
  userActions,
  representatives,
  actions,
  issues,
  teams,
  teamUsers
}
