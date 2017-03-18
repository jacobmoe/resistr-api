const users = require('./tables/users').load()
const userActions = require('./tables/user_actions').load()
const representatives = require('./tables/representatives').load()
const actions = require('./tables/actions').load()
const issues = require('./tables/issues').load()

module.exports = {
  users,
  userActions,
  representatives,
  actions,
  issues
}
