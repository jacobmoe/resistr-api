const knex = require('../db/connection')

const truncate = (table) => {
  if (process.env.NODE_ENV !== 'test') {
    throw "Yikes. Why aren't you in the test env?"
  } else {
    return knex.raw(`TRUNCATE "${table}" RESTART IDENTITY CASCADE`)
  }
}

module.exports = {
  truncate
}
