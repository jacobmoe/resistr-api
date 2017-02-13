const mount = require('koa-mount')
const congressRoutes = require('./congress/routes')
const geographyRoutes = require('./geography/routes')

module.exports = function (app) {
  app.use(mount('/api/congress', congressRoutes))
  app.use(mount('/api/geography', geographyRoutes))
}
