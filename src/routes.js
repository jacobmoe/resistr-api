const mount = require('koa-mount')
const congressRoutes = require('./congress/routes')
const statesRoutes = require('./states/routes')
const geographyRoutes = require('./geography/routes')
const representativesRoutes = require('./representatives/routes')
const userRoutes = require('./users/routes')
const userActionRoutes = require('./userActions/routes')

module.exports = function (app) {
  app.use(mount('/api/congress', congressRoutes))
  app.use(mount('/api/states', statesRoutes))
  app.use(mount('/api/geography', geographyRoutes))
  app.use(mount('/api/representatives', representativesRoutes))
  app.use(mount('/api/users', userRoutes))
  app.use(mount('/api/user-actions', userActionRoutes))
}
