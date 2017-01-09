const mount = require('koa-mount')
const congressRoutes = require('./congress/routes')

module.exports = function (app) {
  app.use(mount('/api/congress', congressRoutes))
}
