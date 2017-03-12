module.exports = (app) => {
  app.use(require('./bodyparser')())
  app.use(require('./errors')())
  app.use(require('./logger')())
  app.use(require('./auth'))
  app.use(require('./cors'))
}
