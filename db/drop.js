const knex = require('knex')
const { dbConnection } = require('config')

const encoding = 'utf-8'

const dbName = dbConnection.database
delete dbConnection.database

const connection = knex({ client: 'pg', connection: dbConnection})

connection.raw(`DROP DATABASE "${dbName}";`)
  .then(console.log(`Dropped ${dbName}`))
  .catch((e) => {
    console.log("Problem dropping database. " + e)
  })
  .finally(connection.destroy)
