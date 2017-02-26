const knex = require('knex')
const { dbConnection } = require('config')

module.exports = knex({
  client: 'pg',
  connection: dbConnection
})
