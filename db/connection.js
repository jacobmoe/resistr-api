const knex = require('knex')
const { database } = require('config')

module.exports = knex({
  client: 'pg',
  connection: {
    host : database.host,
    user : database.user,
    password : database.password,
    database : database.name
  }
})
