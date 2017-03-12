module.exports = {
  development: {
    client: 'pg',
    connection: require('./config/default').dbConnection,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    }
  },
  test: {
    client: 'pg',
    connection: require('./config/test').dbConnection,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  },
  production: {
    client: 'pg',
    connection: require('./config/production').dbConnection,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    }
  }
}
