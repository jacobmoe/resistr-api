const knex = require('knex')
const { dbConnection } = require('config')

const encoding = 'utf-8'

const dbName = dbConnection.database
delete dbConnection.database

const connection = knex({ client: 'pg', connection: dbConnection})

connection.raw(`
  CREATE DATABASE "${dbName}"
  WITH ENCODING = '${encoding}';
`) .then(console.log(`Created ${dbName}`))
  .catch((e) => {
    console.log("Problem creating database. " + e)
  })
  .finally(connection.destroy)
